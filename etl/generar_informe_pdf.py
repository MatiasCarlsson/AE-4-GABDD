"""Generador del informe en formato pdf a partir del archivo markdown."""

from pathlib import Path
import base64
import re
import subprocess
import mistune

BASE_DIR = Path(__file__).resolve().parent.parent
MD_PATH = BASE_DIR / "INFORME_AE4_GABD_2026.md"
HTML_PATH = BASE_DIR / "INFORME_AE4_GABD_2026.html"
PDF_PATH = BASE_DIR / "INFORME_AE4_GABD_2026.pdf"
IMG_PATH = BASE_DIR / "sql" / "diagrama_estrella_dw.jpg"

# Lectura del archivo markdown
md_content = MD_PATH.read_text(encoding="utf-8")

markdown = mistune.create_markdown(plugins=["table", "url", "strikethrough"])
html_body = markdown(md_content)

# Conversión del marcador de salto de página y eliminación de cualquier barra separadora
html_body = html_body.replace("<p>SALTO_DE_PAGINA</p>", '<p style="page-break-before: always; margin: 0;"></p>')
html_body = re.sub(r"<hr\s*/?>", "", html_body)

# Compactación de bloques de código para evitar saltos dobles en libreoffice
def formatear_codigo(match):
    contenido = match.group(1).strip("\n").replace("\n", "<br/>")
    return (
        '<table border="1" cellspacing="0" cellpadding="4" width="100%" '
        'style="border-collapse: collapse; border: 0.75pt solid #000000; margin: 4px 0;">'
        '<tr><td style="border: 0.75pt solid #000000; background-color: #f8fafc; '
        'font-family: \'Liberation Mono\', monospace; font-size: 7.5pt; padding: 4px 6px; text-align: left;">'
        f"{contenido}</td></tr></table>"
    )

html_body = re.sub(r"<pre><code[^>]*>(.*?)</code></pre>", formatear_codigo, html_body, flags=re.DOTALL)

# Aplicación de bordes negros de 0.75pt en todas las tablas y celdas
html_body = html_body.replace(
    "<table>",
    '<table border="1" cellspacing="0" cellpadding="2" width="100%" style="border-collapse: collapse; border: 0.75pt solid #000000; margin: 5px 0;">',
)
html_body = re.sub(
    r"<th(\s+[^>]*)?>",
    r'<th\1 style="border: 0.75pt solid #000000; background-color: #f1f5f9; color: #0f172a; font-weight: bold; padding: 2.5px 4px; font-size: 7.5pt;">',
    html_body,
)
html_body = re.sub(
    r"<td(\s+[^>]*)?>",
    r'<td\1 style="border: 0.75pt solid #000000; padding: 2.5px 4px; font-size: 7.5pt;">',
    html_body,
)
img_b64 = base64.b64encode(IMG_PATH.read_bytes()).decode("ascii")
html_body = re.sub(
    r'<img\s+src="sql/diagrama_estrella_dw\.jpg"\s+alt="([^"]*)"\s*/?>',
    f'<p style="text-align: center; margin: 6px 0;"><img src="data:image/jpeg;base64,{img_b64}" alt="\\1" width="480" /></p>',
    html_body,
)

full_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Informe final ae4</title>
<style>
  @page {{ size: A4; margin: 14mm 14mm 14mm 14mm; }}
  body {{ font-family: 'Liberation Sans', 'Segoe UI', Arial, sans-serif; font-size: 9pt; line-height: 1.32; color: #111827; }}
  h1 {{ font-size: 15pt; color: #0f172a; border: none; margin-top: 0; margin-bottom: 4px; }}
  h2 {{ font-size: 11.5pt; color: #1e3a8a; border: none; margin-top: 10px; margin-bottom: 4px; page-break-after: avoid; }}
  h3 {{ font-size: 10pt; color: #1e40af; border: none; margin-top: 8px; margin-bottom: 3px; page-break-after: avoid; }}
  p {{ margin-top: 2px; margin-bottom: 4px; text-align: justify; }}
  li {{ margin-top: 1px; margin-bottom: 2px; text-align: justify; }}
  ul, ol {{ margin-top: 2px; margin-bottom: 4px; padding-left: 16px; }}
  table {{ width: 100%; border-collapse: collapse; border: 0.75pt solid #000000; margin: 5px 0; font-size: 7.5pt; }}
  th, td {{ border: 0.75pt solid #000000; padding: 2.5px 4px; text-align: left; vertical-align: middle; }}
  th {{ background-color: #f1f5f9; color: #0f172a; font-weight: bold; }}
  code {{ font-family: 'Liberation Mono', 'Courier New', monospace; font-size: 8pt; background-color: #f3f4f6; padding: 0 2px; }}
</style>
</head>
<body>
{html_body}
</body>
</html>"""

HTML_PATH.write_text(full_html, encoding="utf-8")
subprocess.run(["libreoffice", "--headless", "--convert-to", "pdf", str(HTML_PATH), "--outdir", str(BASE_DIR)], check=True)
if HTML_PATH.exists():
    HTML_PATH.unlink()
print(f"Informe en pdf generado correctamente en: {str(PDF_PATH).lower()}")

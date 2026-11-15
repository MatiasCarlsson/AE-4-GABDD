"""Generador del informe en formato pdf a partir del archivo markdown."""

from pathlib import Path
import subprocess
import mistune

BASE_DIR = Path(__file__).resolve().parent.parent
MD_PATH = BASE_DIR / "INFORME_AE4_GABD_2026.md"
HTML_PATH = BASE_DIR / "INFORME_AE4_GABD_2026.html"
PDF_PATH = BASE_DIR / "INFORME_AE4_GABD_2026.pdf"

# Lectura del archivo markdown y conversión del diagrama a texto preformateado
md_content = MD_PATH.read_text(encoding="utf-8").replace("```mermaid", "```text")

markdown = mistune.create_markdown(plugins=["table", "url", "strikethrough"])
html_body = markdown(md_content)

full_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Informe final ae4</title>
<style>
  @page {{ size: A4; margin: 20mm 18mm 20mm 18mm; }}
  body {{ font-family: 'Liberation Sans', 'Segoe UI', Arial, sans-serif; font-size: 10pt; line-height: 1.5; color: #1f2937; }}
  h1 {{ font-size: 18pt; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-top: 0; margin-bottom: 8px; }}
  h2 {{ font-size: 13pt; color: #1e40af; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 18px; margin-bottom: 8px; page-break-after: avoid; }}
  h3 {{ font-size: 11pt; color: #1e3a8a; margin-top: 14px; margin-bottom: 6px; page-break-after: avoid; }}
  p, li {{ margin-top: 3px; margin-bottom: 5px; text-align: justify; }}
  table {{ width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 8.5pt; page-break-inside: avoid; }}
  th, td {{ border: 1px solid #cbd5e1; padding: 5px 7px; text-align: left; }}
  th {{ background-color: #f1f5f9; color: #0f172a; font-weight: 600; }}
  tr:nth-child(even) {{ background-color: #f8fafc; }}
  code {{ font-family: 'Liberation Mono', 'Courier New', monospace; font-size: 8.5pt; background-color: #f1f5f9; padding: 1px 4px; border-radius: 3px; }}
  pre {{ background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 8px; font-size: 7.5pt; border-radius: 4px; overflow-x: auto; }}
</style>
</head>
<body>
{html_body}
</body>
</html>"""

HTML_PATH.write_text(full_html, encoding="utf-8")
subprocess.run(["libreoffice", "--headless", "--convert-to", "pdf", str(HTML_PATH), "--outdir", str(BASE_DIR)], check=True)
print(f"Informe en pdf generado correctamente en: {str(PDF_PATH).lower()}")

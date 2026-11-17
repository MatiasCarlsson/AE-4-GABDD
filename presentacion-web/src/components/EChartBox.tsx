import { memo, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EChartBoxProps {
  option: echarts.EChartsOption;
  height?: number | string;
  active?: boolean;
  onPointClick?: (params: unknown) => void;
}

const EChartBox = memo(function EChartBox({
  option,
  height = 380,
  active = true,
  onPointClick,
}: EChartBoxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const clickHandlerRef = useRef(onPointClick);
  const wasActiveRef = useRef(active);

  clickHandlerRef.current = onPointClick;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const instance = echarts.init(el, undefined, { renderer: 'canvas' });
    chartRef.current = instance;

    const handleClick = (params: unknown) => {
      clickHandlerRef.current?.(params);
    };
    instance.on('click', handleClick);

    const ro = new ResizeObserver(() => {
      instance.resize();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      instance.off('click', handleClick);
      instance.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    const instance = chartRef.current;
    if (!instance) return;

    const becameActive = active && !wasActiveRef.current;
    wasActiveRef.current = active;

    if (becameActive) {
      instance.clear();
    }

    instance.setOption(
      {
        animationDuration: 850,
        animationEasing: 'cubicOut',
        animationDelay: (idx: number) => idx * 35,
        ...option,
      },
      true
    );
  }, [option, active]);

  return <div ref={containerRef} style={{ width: '100%', height }} />;
});

export default EChartBox;

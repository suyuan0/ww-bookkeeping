import { useEffect, useRef } from "react";
import { countUpAnimation } from "../../utils/animations";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export default function AnimatedNumber({
  value,
  duration = 1,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0
}: AnimatedNumberProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const previousValue = useRef(0);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    const from = previousValue.current;
    const to = value;

    if (from !== to) {
      countUpAnimation(element, from, to, duration);
      previousValue.current = to;
    }
  }, [value, duration]);

  // 格式化数字
  const formatNumber = (num: number) => {
    return decimals > 0 ? num.toFixed(decimals) : Math.round(num).toLocaleString();
  };

  return (
    <span className={className}>
      {prefix}
      <span ref={numberRef}>{formatNumber(value)}</span>
      {suffix}
    </span>
  );
}

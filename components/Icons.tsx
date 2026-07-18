import type { CSSProperties, JSX } from 'react';

type IconProps = { size?: number; className?: string; style?: CSSProperties };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export function IconChart({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M4 20h16" />
      <path d="M7 16v-4" />
      <path d="M12 16V8" />
      <path d="M17 16v-7" />
      <path d="M5 8l5-4 4 3 5-4" />
    </svg>
  );
}

export function IconPeople({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M15.5 14.7c2.4.1 4.3 1.4 4.9 4" />
    </svg>
  );
}

export function IconStore({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M4 10l1.2-5h13.6L20 10" />
      <path d="M4 10c0 1.3 1 2.4 2.3 2.4S8.6 11.3 8.6 10c0 1.3 1 2.4 2.3 2.4s2.3-1.1 2.3-2.4c0 1.3 1 2.4 2.3 2.4S17.8 11.3 17.8 10c0 1.3 1 2.4 2.2 2.4" />
      <path d="M5.5 12.4V20h13v-7.6" />
      <path d="M9.5 20v-5h5v5" />
    </svg>
  );
}

export function IconMegaphone({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l1.5 5h2L9 15" />
      <path d="M7 10l11-5v14l-11-4" />
      <path d="M20.5 10.5a3 3 0 0 1 0 3" />
    </svg>
  );
}

export function IconCalendar({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16" />
      <path d="M8.5 3.5v4M15.5 3.5v4" />
      <path d="M8.5 14h3M8.5 17h5" />
    </svg>
  );
}

export function IconBriefcase({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
      <path d="M3.5 12.5c2.8 1.4 5.6 2 8.5 2s5.7-.6 8.5-2" />
      <path d="M12 13.5v2" />
    </svg>
  );
}

export function IconAcademy({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M2.5 9.5L12 4.5l9.5 5-9.5 5-9.5-5z" />
      <path d="M6.5 11.6v4.2c0 1.3 2.5 2.7 5.5 2.7s5.5-1.4 5.5-2.7v-4.2" />
      <path d="M21.5 9.5v5" />
    </svg>
  );
}

export function IconRoute({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <circle cx="6" cy="18.5" r="2.2" />
      <circle cx="18" cy="5.5" r="2.2" />
      <path d="M8.2 18.5h7.3a3.5 3.5 0 0 0 0-7H8.5a3 3 0 0 1 0-6h7.3" />
    </svg>
  );
}

export function IconPhone({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M5.5 4h3l1.5 4-2 1.5a12.5 12.5 0 0 0 6.5 6.5L16 14l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4z" />
    </svg>
  );
}

export function IconMail({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M4.5 7.5l7.5 5.5 7.5-5.5" />
    </svg>
  );
}

export function IconPin({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M12 21s-6.5-5.4-6.5-10.3a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </svg>
  );
}

export function IconClock({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconDoc({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M6 3.5h8l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 20V5A1.5 1.5 0 0 1 6.5 3.5z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.5 12.5h7M8.5 16h5" />
    </svg>
  );
}

export function IconArrow({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck({ size = 24, className, style }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export const PROGRAM_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  chart: IconChart,
  people: IconPeople,
  store: IconStore,
  megaphone: IconMegaphone,
  calendar: IconCalendar,
  briefcase: IconBriefcase,
  academy: IconAcademy,
  route: IconRoute,
};

export function ProgramIcon({ name, ...props }: IconProps & { name?: string }) {
  const Cmp = (name && PROGRAM_ICONS[name]) || IconChart;
  return <Cmp {...props} />;
}

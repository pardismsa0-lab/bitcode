import type { ReactNode } from "react";

function I({ children, className = "w-5 h-5", filled = false }: { children: ReactNode; className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const LogoMark = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <rect x="1.5" y="1.5" width="37" height="37" rx="9" fill="var(--color-night-800)" stroke="var(--color-night-600)" strokeWidth="1.4" />
    <path d="M15 11l-7 9 7 9" stroke="var(--color-amber)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M25 11l7 9-7 9" stroke="var(--color-teal)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPlay = ({ className }: { className?: string }) => (
  <I className={className} filled><path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.2-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5Z" /></I>
);
export const IconClock = ({ className }: { className?: string }) => (
  <I className={className}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></I>
);
export const IconSession = ({ className }: { className?: string }) => (
  <I className={className}><path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5Z" /><path d="m4.5 12 7.5 3.8 7.5-3.8" /><path d="m4.5 16 7.5 3.8L19.5 16" /></I>
);
export const IconUsers = ({ className }: { className?: string }) => (
  <I className={className}><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" /><path d="M15.5 5.8a3.2 3.2 0 0 1 0 5.4M17.5 14.8c1.6.7 2.7 2.3 3 4.7" /></I>
);
export const IconStar = ({ className }: { className?: string }) => (
  <I className={className} filled><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8L12 3Z" /></I>
);
export const IconCheck = ({ className }: { className?: string }) => (
  <I className={className}><path d="m5 12.5 4.5 4.5L19 7.5" /></I>
);
export const IconSearch = ({ className }: { className?: string }) => (
  <I className={className}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.9-4.9" /></I>
);
export const IconArrow = ({ className }: { className?: string }) => (
  <I className={className}><path d="M19 12H5.5" /><path d="m11 5.5-6.5 6.5 6.5 6.5" /></I>
);
export const IconTerminal = ({ className }: { className?: string }) => (
  <I className={className}><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="m7 9.5 3.5 3L7 15.5" /><path d="M12.5 15.5H17" /></I>
);
export const IconCert = ({ className }: { className?: string }) => (
  <I className={className}><circle cx="12" cy="9" r="5.5" /><path d="m8.6 13.5-1.6 7 5-2.6 5 2.6-1.6-7" /><path d="m10 9 1.4 1.4L14.2 7.6" /></I>
);
export const IconBranch = ({ className }: { className?: string }) => (
  <I className={className}><circle cx="6.5" cy="5.5" r="2.2" /><circle cx="6.5" cy="18.5" r="2.2" /><circle cx="17.5" cy="7" r="2.2" /><path d="M6.5 7.7v8.6" /><path d="M17.5 9.2c0 3.5-4 4-8 4.3" /></I>
);
export const IconQuote = ({ className }: { className?: string }) => (
  <I className={className} filled><path d="M9.5 5.5c-3.6 1.4-5.5 4-5.5 7.7 0 3 1.8 5 4.3 5 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.4-3.3-3.4h-.5c.4-1.7 1.6-3 3.4-3.9L9.5 5.5Zm10 0c-3.6 1.4-5.5 4-5.5 7.7 0 3 1.8 5 4.3 5 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.4-3.3-3.4h-.5c.4-1.7 1.6-3 3.4-3.9l-2.2-1.7Z" /></I>
);
export const IconSpark = ({ className }: { className?: string }) => (
  <I className={className} filled><path d="M12 2.5 14 9l6.5 2L14 13l-2 6.5L10 13l-6.5-2L10 9l2-6.5Z" /></I>
);
export const IconShield = ({ className }: { className?: string }) => (
  <I className={className}><path d="M12 3.5 19 6v5.2c0 4.6-3 8-7 9.3-4-1.3-7-4.7-7-9.3V6l7-2.5Z" /><path d="m9 11.5 2.2 2.2 4-4.2" /></I>
);
export const IconCap = ({ className }: { className?: string }) => (
  <I className={className}><path d="m12 4.5 9.5 4.5L12 13.5 2.5 9 12 4.5Z" /><path d="M6.5 11v4.2c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11" /><path d="M21.5 9.5V15" /></I>
);

/* --- آیکون حوزه‌های آموزشی --- */
export const IconCode = ({ className }: { className?: string }) => (
  <I className={className}><path d="m8.5 7-5 5 5 5" /><path d="m15.5 7 5 5-5 5" /><path d="m13.2 5-2.4 14" /></I>
);
export const IconCpu = ({ className }: { className?: string }) => (
  <I className={className}><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></I>
);
export const IconBlueprint = ({ className }: { className?: string }) => (
  <I className={className}><path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" /><path d="M12 3.5V12l8.5 0" /><path d="M12 7.8V12l4.2 0" /><circle cx="12" cy="12" r="1" /></I>
);
export const IconGlobe = ({ className }: { className?: string }) => (
  <I className={className}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5S9.5 5.8 12 3.5Z" /></I>
);
export const IconBrain = ({ className }: { className?: string }) => (
  <I className={className}><path d="M9.5 4A2.8 2.8 0 0 0 6 6.7 3.2 3.2 0 0 0 4 9.8c0 .8.3 1.6.8 2.2A3.3 3.3 0 0 0 4 14.2 3.3 3.3 0 0 0 7.3 17.5c.3 1.6 1.6 2.8 3.2 2.8 1 0 1.5-.5 1.5-1.4V6.4C12 5 11 4 9.5 4Z" /><path d="M14.5 4A2.8 2.8 0 0 1 18 6.7a3.2 3.2 0 0 1 2 3.1c0 .8-.3 1.6-.8 2.2a3.3 3.3 0 0 1 .8 2.2 3.3 3.3 0 0 1-3.3 3.3c-.3 1.6-1.6 2.8-3.2 2.8-1 0-1.5-.5-1.5-1.4V6.4C12 5 13 4 14.5 4Z" /></I>
);
export const IconServer = ({ className }: { className?: string }) => (
  <I className={className}><rect x="3.5" y="4" width="17" height="6.5" rx="1.8" /><rect x="3.5" y="13.5" width="17" height="6.5" rx="1.8" /><circle cx="7.5" cy="7.2" r="0.6" fill="currentColor" /><circle cx="7.5" cy="16.8" r="0.6" fill="currentColor" /><path d="M11 7.2h6M11 16.8h6" /></I>
);

export function CatIcon({ k, className }: { k: string; className?: string }) {
  switch (k) {
    case "prog": return <IconCode className={className} />;
    case "cs": return <IconCpu className={className} />;
    case "se": return <IconBlueprint className={className} />;
    case "web": return <IconGlobe className={className} />;
    case "data": return <IconBrain className={className} />;
    case "infra": return <IconServer className={className} />;
    default: return <IconCode className={className} />;
  }
}

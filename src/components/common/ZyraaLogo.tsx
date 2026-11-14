import React from 'react';

interface ZyraaLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const ZyraaLogo: React.FC<ZyraaLogoProps> = ({
  variant = 'dark',
  size = 'md',
}) => {
  const colorClass = variant === 'light' ? 'text-[#FAF8F5]' : 'text-[#141414]';
  const accentLine = variant === 'light' ? 'bg-[#D9B6AA]' : 'bg-[#C89D8E]';
  const sizeClass =
    size === 'sm'
      ? 'text-xl tracking-[0.26em]'
      : size === 'lg'
        ? 'text-3xl tracking-[0.3em]'
        : 'text-2xl tracking-[0.28em]';

  return (
    <span
      className={`inline-flex items-center gap-2 font-serif font-semibold uppercase select-none whitespace-nowrap shrink-0 ${colorClass} ${sizeClass}`}
      style={{ fontFamily: 'var(--font-serif)' }}
    >
      <span>ZYRAA</span>
      <span className={`hidden sm:inline-block h-[1px] w-4 ${accentLine}`} aria-hidden="true" />
    </span>
  );
};

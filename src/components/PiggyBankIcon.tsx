import React from 'react';

interface PiggyBankIconProps {
  size?: number;
  className?: string;
}

export function PiggyBankIcon({ size = 16, className = '' }: PiggyBankIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 512 512" 
      fill="currentColor"
      className={className}
    >
      <path d="M400 160c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm-48-32c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32z"/>
      <path d="M448 256c0 88.4-71.6 160-160 160S128 344.4 128 256S199.6 96 288 96s160 71.6 160 160zm-160-96c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96z"/>
      <path d="M288 64C164.3 64 64 164.3 64 288c0 123.7 100.3 224 224 224s224-100.3 224-224c0-123.7-100.3-224-224-224zm0 416c-106 0-192-86-192-192S182 96 288 96s192 86 192 192s-86 192-192 192z"/>
      <path d="M352 256c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zm-64-32c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32z"/>
    </svg>
  );
}
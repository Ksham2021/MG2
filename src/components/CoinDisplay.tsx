import React from 'react';
import { PiggyBankIcon } from './PiggyBankIcon';

interface CoinDisplayProps {
  amount: number;
}

export function CoinDisplay({ amount }: CoinDisplayProps) {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
      <PiggyBankIcon size={16} className="text-pink-400" />
      <span className="font-medium text-white">{amount}</span>
    </div>
  );
}
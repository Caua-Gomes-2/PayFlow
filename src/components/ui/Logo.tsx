import React from 'react';
import { Wallet } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return <Wallet className={className} />;
};
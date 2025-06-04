import Link from 'next/link';
import { Rocket } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

const Logo = ({ className = '', iconSize = 24, textSize = 'text-xl' }: LogoProps) => {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Rocket className="text-primary" size={iconSize} />
      <span className={`font-bold font-headline ${textSize} text-foreground`}>
        MetaVerse Hub
      </span>
    </Link>
  );
};

export default Logo;

import Image from "next/image";
import { siteLogoPath } from "@/lib/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export const Logo = ({ className = "h-9 w-auto", priority = false }: LogoProps) => (
  <Image
    src={siteLogoPath}
    alt="Somanath Studio"
    width={1536}
    height={1024}
    className={className}
    priority={priority}
  />
);

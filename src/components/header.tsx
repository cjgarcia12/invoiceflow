import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};
const Header: React.FC<Props> = ({ children }) => {
  return (
    <header className="flex items-center justify-around w-full h-[50px] pt-8">
      {children}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo with name"
          width={150}
          height={150}
          className="hidden md:block"
        />
        <Image
          src="/logosmall.png"
          alt="Logo"
          width={100}
          height={100}
          className="mr-2 md:hidden"
        />
      </Link>
    </header>
  );
};
export default Header;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Header() {
  return (
    <header className="w-full flex justify-between py-6 items-center font-[family-name:var(--font-work-sans)] border-b border-b-base-200">
      <Image src="/skinsight-logo.svg" width={177} height={40} alt="logo" />

      <nav className="flex gap-5 items-center">
        <Link href="/">Features</Link>
        <Link href="/">FAQs</Link>
      </nav>

      <button className="btn rounded-full btn-primary">
        <Icon icon="meteor-icons:share" /> Share
      </button>
    </header>
  );
}

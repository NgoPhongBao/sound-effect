"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/rive">Rive</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

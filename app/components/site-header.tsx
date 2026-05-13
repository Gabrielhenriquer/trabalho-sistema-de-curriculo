"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks, FilePlus } from "lucide-react";

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/sistema/paginas/curriculos", label: "Currículos", icon: ListChecks },
  { href: "/sistema/paginas/curriculos/novo", label: "Cadastrar", icon: FilePlus },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-300/70 bg-zinc-100/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:px-8 md:flex-row md:items-center md:justify-between">
        <nav className="order-first flex flex-wrap items-center gap-2 md:order-none">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:border-lime-500 hover:bg-lime-50 ${
                  active ? "border-lime-600 bg-lime-100 text-lime-950" : "border-transparent text-zinc-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold text-zinc-950">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-lime-500 text-white shadow-sm">
              S
            </span>
            Sistema de Currículos
          </Link>
          <p className="text-sm text-zinc-600">Gestão de currículos com foco em UX, validação e responsividade.</p>
        </div>
      </div>
    </header>
  );
}

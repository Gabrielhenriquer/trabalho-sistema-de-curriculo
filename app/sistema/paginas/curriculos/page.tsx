"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { formatResumo, initialCurriculos, storageKey, Curriculo } from "../../../lib/curriculos";

export default function CurriculosPage() {
  const [search, setSearch] = useState("");
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setCurriculos(JSON.parse(saved));
      return;
    }
    window.localStorage.setItem(storageKey, JSON.stringify(initialCurriculos));
    setCurriculos(initialCurriculos);
  }, []);

  useEffect(() => {
    if (curriculos.length > 0) {
      window.localStorage.setItem(storageKey, JSON.stringify(curriculos));
    }
  }, [curriculos]);

  const filteredCurriculos = useMemo(
    () =>
      curriculos.filter((item) => {
        const term = search.toLowerCase();
        return item.nome.toLowerCase().includes(term) || item.cargo.toLowerCase().includes(term);
      }),
    [curriculos, search],
  );

  return (
    <main className="mx-auto flex min-h-[calc(100vh-148px)] max-w-7xl flex-col gap-8 px-6 py-10 md:px-8">
      <section className="rounded-3xl border border-zinc-300/70 bg-white p-8 shadow-sm shadow-zinc-200/50">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-950">Lista de Currículos</h1>
            <p className="mt-2 text-zinc-600">Filtre por nome ou cargo e acesse os detalhes individuais dos candidatos.</p>
          </div>
          <Link href="/sistema/paginas/curriculos/novo" className="inline-flex items-center justify-center rounded-full bg-lime-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-lime-500">
            Cadastrar novo currículo
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          <label className="relative block">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-3xl border border-zinc-300/80 bg-zinc-50 py-4 pl-12 pr-4 text-zinc-900 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              placeholder="Buscar por nome ou cargo"
              aria-label="Buscar currículos"
            />
          </label>

          {filteredCurriculos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-300/80 bg-zinc-50 p-8 text-center text-zinc-600">
              Nenhum currículo encontrado. Tente outro termo ou cadastre um novo currículo.
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredCurriculos.map((curriculo) => (
                <article key={curriculo.id} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm shadow-zinc-200/30">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-lime-700">{curriculo.cargo}</p>
                      <h2 className="mt-2 text-2xl font-semibold text-zinc-950">{curriculo.nome}</h2>
                    </div>
                    <Link
                      href={`/sistema/paginas/curriculos/${curriculo.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-lime-500 hover:bg-lime-50"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                  <p className="mt-5 text-zinc-700">{formatResumo(curriculo.resumo)}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

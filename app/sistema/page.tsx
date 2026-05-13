import Link from "next/link";

export default function SistemaPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-148px)] max-w-6xl flex-col gap-8 px-6 py-10 md:px-8">
      <section className="rounded-3xl border border-zinc-300/70 bg-zinc-50 p-10 shadow-sm shadow-zinc-200/70">
        <h1 className="text-3xl font-semibold text-zinc-950">Bem-vindo ao sistema de currículos</h1>
        <p className="mt-4 text-zinc-700 leading-8">
          Neste espaço você pode navegar na lista de currículos, consultar os detalhes de cada candidato e cadastrar novos perfis com validação completa.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="/sistema/paginas/curriculos" className="rounded-full bg-lime-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-lime-500">
            Ir para lista de currículos
          </Link>
          <Link href="/sistema/paginas/curriculos/novo" className="rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-lime-500 hover:bg-lime-50">
            Cadastrar novo currículo
          </Link>
        </div>
      </section>
    </main>
  );
}

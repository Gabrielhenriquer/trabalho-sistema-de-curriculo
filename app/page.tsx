import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-148px)] max-w-7xl flex-col gap-10 px-6 py-10 md:px-8">
      <section className="rounded-3xl border border-zinc-300/70 bg-zinc-50 p-10 shadow-sm shadow-zinc-200/70">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-lime-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-lime-700">
              Sistema de Currículos
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Remodelando a gestão de currículos com Next.js e UX funcional.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-700">
              Interface clean, validação de formulários, filtros em tempo real e campos dinâmicos para experiência profissional e formação acadêmica.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/sistema/paginas/curriculos" className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
                Ver currículos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sistema/paginas/curriculos/novo" className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-lime-500 hover:bg-lime-50">
                Cadastrar novo currículo
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl bg-white p-8 shadow-sm shadow-zinc-200/50">
            <div className="flex items-center gap-4 rounded-3xl bg-zinc-900/95 p-6 text-white">
              <Sparkles className="h-6 w-6 text-lime-300" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-zinc-200">Design clean</p>
                <p className="font-semibold">Paleta cinza com verde-limão para contraste leve.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl bg-zinc-100 p-6">
              <Search className="h-6 w-6 text-zinc-700" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Busca inteligente</p>
                <p className="font-semibold text-zinc-950">Filtro em tempo real por nome ou cargo.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl bg-zinc-100 p-6">
              <ShieldCheck className="h-6 w-6 text-lime-500" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Validação forte</p>
                <p className="font-semibold text-zinc-950">Yup e React Hook Form com máscaras de entrada.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { title: "Experiências Dinâmicas", text: "Adicione e remova experiências profissionais e formações acadêmicas no cadastro." },
          { title: "Persistência Mockada", text: "Dados são armazenados no localStorage para manter os currículos disponíveis localmente." },
          { title: "Feedback em Tempo Real", text: "Alertas Sonner exibem sucesso e erros de validação de forma clara." },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-zinc-300/70 bg-white p-6 shadow-sm shadow-zinc-200/50">
            <h2 className="text-xl font-semibold text-zinc-950">{item.title}</h2>
            <p className="mt-3 text-zinc-600">{item.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

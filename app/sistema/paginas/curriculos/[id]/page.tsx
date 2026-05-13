"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Curriculo, storageKey } from "../../../../lib/curriculos";

type Props = {
  params: { id: string };
};

export default function CurriculoDetailsPage({ params }: Props) {
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      setLoading(false);
      return;
    }
    const parsed: Curriculo[] = JSON.parse(saved);
    const found = parsed.find((item) => item.id === params.id) ?? null;
    setCurriculo(found);
    setLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    if (!curriculo) return;
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    const parsed: Curriculo[] = JSON.parse(saved);
    const updated = parsed.filter((item) => item.id !== curriculo.id);
    window.localStorage.setItem(storageKey, JSON.stringify(updated));
    toast.success("Currículo excluído com sucesso.");
    router.push("/sistema/paginas/curriculos");
  };

  if (loading) {
    return <div className="min-h-[calc(100vh-148px)] p-10">Carregando currículo...</div>;
  }

  if (!curriculo) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-148px)] max-w-5xl flex-col gap-6 px-6 py-10 md:px-8">
        <div className="rounded-3xl border border-zinc-300/70 bg-zinc-50 p-10 text-center text-zinc-700">
          <h1 className="text-2xl font-semibold text-zinc-950">Currículo não encontrado</h1>
          <p className="mt-3">Verifique se o candidato ainda está cadastrado ou retorne à lista.</p>
          <Link href="/sistema/paginas/curriculos" className="mt-6 inline-flex rounded-full bg-lime-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-lime-500">
            Voltar para a lista
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-148px)] max-w-6xl flex-col gap-8 px-6 py-10 md:px-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-300/70 bg-white p-8 shadow-sm shadow-zinc-200/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-lime-700">{curriculo.cargo}</p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-950">{curriculo.nome}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/sistema/paginas/curriculos" className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-lime-500 hover:bg-lime-50">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              <Trash2 className="h-4 w-4" /> Excluir
            </button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_0.7fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <h2 className="text-xl font-semibold text-zinc-950">Resumo profissional</h2>
              <p className="mt-4 text-zinc-700">{curriculo.resumo}</p>
            </section>
            <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <h2 className="text-xl font-semibold text-zinc-950">Experiências profissionais</h2>
              <div className="mt-4 space-y-4">
                {curriculo.experiencias.map((item, index) => (
                  <div key={index} className="rounded-3xl border border-zinc-200 bg-white p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{item.periodo}</p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-950">{item.cargo}</h3>
                    <p className="text-zinc-700">{item.empresa}</p>
                    <p className="mt-2 text-zinc-600">{item.descricao}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <h2 className="text-xl font-semibold text-zinc-950">Formação acadêmica</h2>
              <div className="mt-4 space-y-4">
                {curriculo.formacoes.map((item, index) => (
                  <div key={index} className="rounded-3xl border border-zinc-200 bg-white p-4">
                    <h3 className="text-lg font-semibold text-zinc-950">{item.curso}</h3>
                    <p className="text-zinc-700">{item.instituicao}</p>
                    <p className="mt-1 text-sm text-zinc-500">{item.periodo}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-zinc-200/30">
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Contato</p>
              <p className="mt-4 font-semibold text-zinc-950">{curriculo.email}</p>
              <p className="text-zinc-700">{curriculo.telefone}</p>
              <p className="mt-4 text-sm text-zinc-500">CPF: {curriculo.cpf}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-zinc-200/30">
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Habilidades</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {curriculo.habilidades.map((item) => (
                  <span key={item} className="rounded-full bg-lime-100 px-3 py-1 text-sm font-medium text-lime-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-zinc-200/30">
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Foto de perfil</p>
              <div className="mt-4 flex h-28 items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-100 text-zinc-500">
                Imagem em public: <span className="font-semibold text-zinc-900">{curriculo.imagem}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

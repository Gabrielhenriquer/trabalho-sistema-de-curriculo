"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Upload } from "lucide-react";
import { initialCurriculos, storageKey } from "../../../../lib/curriculos";

import * as yup from "yup";

type FormValues = {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  habilidades: string;
  experiencias: {
    empresa: string;
    cargo: string;
    periodo: string;
    descricao: string;
  }[];
  formacoes: {
    curso: string;
    instituicao: string;
    periodo: string;
  }[];
};

const schema = yup.object({
  nome: yup.string().trim().required("Nome é obrigatório."),
  cargo: yup.string().trim().required("Cargo desejado é obrigatório."),
  email: yup.string().email("E-mail inválido.").required("E-mail é obrigatório."),
  telefone: yup.string().trim().required("Telefone é obrigatório."),
  cpf: yup.string().trim().required("CPF é obrigatório."),
  resumo: yup.string().trim().min(20, "O resumo deve ter pelo menos 20 caracteres.").required("Resumo profissional é obrigatório."),
  habilidades: yup.string().trim().required("Habilidades são obrigatórias."),
  experiencias: yup
    .array()
    .of(
      yup.object({
        empresa: yup.string().trim().required("Nome da empresa é obrigatório."),
        cargo: yup.string().trim().required("Cargo é obrigatório."),
        periodo: yup.string().trim().required("Período é obrigatório."),
        descricao: yup.string().trim().required("Descrição da experiência é obrigatória."),
      }),
    )
    .min(1, "Insira pelo menos uma experiência profissional.")
    .required("Experiência profissional é obrigatória."),
  formacoes: yup
    .array()
    .of(
      yup.object({
        curso: yup.string().trim().required("Curso é obrigatório."),
        instituicao: yup.string().trim().required("Instituição é obrigatória."),
        periodo: yup.string().trim().required("Período é obrigatório."),
      }),
    )
    .min(1, "Insira pelo menos uma formação acadêmica.")
    .required("Formação acadêmica é obrigatória."),
});

export default function NovoCurriculoPage() {
  const [imageName, setImageName] = useState("avatar-lime.svg");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      cargo: "",
      email: "",
      telefone: "",
      cpf: "",
      resumo: "",
      habilidades: "",
      experiencias: [{ empresa: "", cargo: "", periodo: "", descricao: "" }],
      formacoes: [{ curso: "", instituicao: "", periodo: "" }],
    },
    mode: "onTouched",
  });

  const experienciaFieldArray = useFieldArray({ name: "experiencias", control });
  const formacaoFieldArray = useFieldArray({ name: "formacoes", control });

  useEffect(() => {
    if (!window.localStorage.getItem(storageKey)) {
      window.localStorage.setItem(storageKey, JSON.stringify(initialCurriculos));
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      const existing = stored ? JSON.parse(stored) : initialCurriculos;
      const novoCurriculo = {
        id: crypto.randomUUID(),
        nome: data.nome,
        cargo: data.cargo,
        email: data.email,
        telefone: data.telefone,
        cpf: data.cpf,
        resumo: data.resumo,
        habilidades: data.habilidades.split(",").map((item) => item.trim()).filter(Boolean),
        experiencias: data.experiencias,
        formacoes: data.formacoes,
        imagem: `/${imageName}`,
      };
      window.localStorage.setItem(storageKey, JSON.stringify([...(existing || []), novoCurriculo]));
      toast.success("Currículo cadastrado com sucesso.");
      reset();
      setImageName("avatar-lime.svg");
      router.push("/sistema/paginas/curriculos");
    } catch (error) {
      toast.error("Erro ao salvar o currículo. Tente novamente.");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageName(file.name);
      toast.success("Upload fake de imagem recebido.");
    }
  };

  return (
    <main className="mx-auto min-h-[calc(100vh-148px)] max-w-6xl px-6 py-10 md:px-8">
      <div className="rounded-3xl border border-zinc-300/70 bg-white p-8 shadow-sm shadow-zinc-200/50">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-lime-700">Cadastro</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Novo currículo</h1>
          <p className="mt-3 text-zinc-600">Preencha todos os campos com cuidado. Os campos obrigatórios são validados pelo Yup.</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-zinc-900">Nome</span>
              <input {...register("nome")} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
              {errors.nome && <p className="text-sm text-red-600">{errors.nome.message}</p>}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-zinc-900">Cargo desejado</span>
              <input {...register("cargo")} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
              {errors.cargo && <p className="text-sm text-red-600">{errors.cargo.message}</p>}
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-medium text-zinc-900">E-mail</span>
              <input {...register("email")} type="email" className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-zinc-900">Telefone</span>
              <Controller
                control={control}
                name="telefone"
                render={({ field }) => (
                  <InputMask mask="(99) 99999-9999" {...field}>
                    {(inputProps: any) => (
                      <input {...inputProps} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
                    )}
                  </InputMask>
                )}
              />
              {errors.telefone && <p className="text-sm text-red-600">{errors.telefone.message}</p>}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-zinc-900">CPF</span>
              <Controller
                control={control}
                name="cpf"
                render={({ field }) => (
                  <InputMask mask="999.999.999-99" {...field}>
                    {(inputProps: any) => (
                      <input {...inputProps} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
                    )}
                  </InputMask>
                )}
              />
              {errors.cpf && <p className="text-sm text-red-600">{errors.cpf.message}</p>}
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-900">Resumo profissional</span>
            <textarea {...register("resumo")} rows={4} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
            {errors.resumo && <p className="text-sm text-red-600">{errors.resumo.message}</p>}
          </label>

          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-zinc-900">Habilidades</span>
              <input {...register("habilidades")} placeholder="React, Next.js, Comunicação" className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
              {errors.habilidades && <p className="text-sm text-red-600">{errors.habilidades.message}</p>}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-zinc-900">Upload fake de imagem</span>
              <div className="flex items-center gap-3 rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3">
                <Upload className="h-5 w-5 text-zinc-600" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-zinc-700" />
              </div>
              <p className="text-sm text-zinc-500">Arquivo selecionado: {imageName}</p>
            </label>
          </div>

          <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">Experiências profissionais</h2>
                <p className="text-sm text-zinc-600">Adicione quantas experiências forem necessárias.</p>
              </div>
              <button
                type="button"
                onClick={() => experienciaFieldArray.append({ empresa: "", cargo: "", periodo: "", descricao: "" })}
                className="inline-flex items-center gap-2 rounded-full bg-lime-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-lime-500"
              >
                <Plus className="h-4 w-4" /> Adicionar
              </button>
            </div>
            <div className="space-y-6">
              {experienciaFieldArray.fields.map((field, index) => (
                <div key={field.id} className="rounded-3xl border border-zinc-300 bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-zinc-950">Experiência {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => experienciaFieldArray.remove(index)}
                      className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" /> Remover
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-zinc-900">Empresa</span>
                      <input {...register(`experiencias.${index}.empresa` as const)} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-zinc-900">Cargo</span>
                      <input {...register(`experiencias.${index}.cargo` as const)} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
                    </label>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-zinc-900">Período</span>
                      <input {...register(`experiencias.${index}.periodo` as const)} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-zinc-900">Descrição</span>
                      <textarea {...register(`experiencias.${index}.descricao` as const)} rows={2} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">Formação acadêmica</h2>
                <p className="text-sm text-zinc-600">Inclua sua formação de forma dinâmica.</p>
              </div>
              <button
                type="button"
                onClick={() => formacaoFieldArray.append({ curso: "", instituicao: "", periodo: "" })}
                className="inline-flex items-center gap-2 rounded-full bg-lime-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-lime-500"
              >
                <Plus className="h-4 w-4" /> Adicionar
              </button>
            </div>
            <div className="space-y-6">
              {formacaoFieldArray.fields.map((field, index) => (
                <div key={field.id} className="rounded-3xl border border-zinc-300 bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-zinc-950">Formação {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => formacaoFieldArray.remove(index)}
                      className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" /> Remover
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-zinc-900">Curso</span>
                      <input {...register(`formacoes.${index}.curso` as const)} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-zinc-900">Instituição</span>
                      <input {...register(`formacoes.${index}.instituicao` as const)} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
                    </label>
                  </div>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-zinc-900">Período</span>
                    <input {...register(`formacoes.${index}.periodo` as const)} className="w-full rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-lime-500 focus:ring-2 focus:ring-lime-200" />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">Campos inválidos são realçados e o toast informa o erro.</p>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="inline-flex items-center justify-center rounded-full bg-lime-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-lime-500 disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              {isSubmitting ? "Salvando..." : "Salvar currículo"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

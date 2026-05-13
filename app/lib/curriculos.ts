export type ExperienciaProfissional = {
  empresa: string;
  cargo: string;
  periodo: string;
  descricao: string;
};

export type FormacaoAcademica = {
  curso: string;
  instituicao: string;
  periodo: string;
};

export type Curriculo = {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  experiencias: ExperienciaProfissional[];
  formacoes: FormacaoAcademica[];
  habilidades: string[];
  imagem: string;
};

export const storageKey = "trabalho-sistema-de-curriculo";

export const initialCurriculos: Curriculo[] = [
  {
    id: "1",
    nome: "Mariana Silva",
    cargo: "Analista de RH",
    email: "mariana.silva@example.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-10",
    resumo:
      "Profissional com 5 anos de atuação em gestão de talentos, recrutamento e desenvolvimento organizacional.",
    experiencias: [
      {
        empresa: "Evoluir Consultoria",
        cargo: "Especialista em Recrutamento",
        periodo: "2022 - 2024",
        descricao:
          "Conduziu processos seletivos de média e alta complexidade e implantou trilhas de desenvolvimento interno.",
      },
    ],
    formacoes: [
      {
        curso: "Psicologia",
        instituicao: "Universidade Federal",
        periodo: "2016 - 2020",
      },
    ],
    habilidades: ["Recrutamento", "Comunicação", "Feedback"],
    imagem: "/avatar-lime.svg",
  },
  {
    id: "2",
    nome: "Rafael Costa",
    cargo: "Desenvolvedor Front-end",
    email: "rafael.costa@example.com",
    telefone: "(21) 99988-7766",
    cpf: "987.654.321-00",
    resumo:
      "Desenvolvedor front-end dedicado à criação de interfaces acessíveis, responsivas e com foco em usabilidade.",
    experiencias: [
      {
        empresa: "Pixel Labs",
        cargo: "Desenvolvedor UI",
        periodo: "2021 - 2024",
        descricao:
          "Implementou componentes reutilizáveis em React e otimizou a performance de aplicações web.",
      },
    ],
    formacoes: [
      {
        curso: "Ciência da Computação",
        instituicao: "Instituto Tecnológico",
        periodo: "2017 - 2021",
      },
    ],
    habilidades: ["React", "Next.js", "Tailwind"],
    imagem: "/avatar-lime.svg",
  },
];

export function formatResumo(text: string) {
  return text.length > 120 ? `${text.slice(0, 117)}...` : text;
}

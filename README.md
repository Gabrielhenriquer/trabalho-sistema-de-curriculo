# Trabalho Sistema de Currículos

## Visão Geral

Projeto para o Trabalho 2: Remodelar o Sistema de Gestão de Currículos. Esta aplicação usa o ecossistema Next.js com foco em experiência do usuário, validação de formulário e arquitetura modular.

A interface combina uma paleta de cores cinza com roxo para destacar ações e estados ativos sem perder a aparência clean.

## Tecnologias

- Next.js (App Router)
- Tailwind CSS
- React Hook Form
- Yup
- React Input Mask
- Sonner
- React Icons / Lucide
- Componentes com estilo inspirado em shadcn/ui
- LocalStorage para persistência mockada

## Funcionalidades implementadas

- Landing page com apresentação do sistema
- Header com navegação posicionada antes do título e estado ativo
- Título do site traduzido para "Sistema de Currículos"
- Lista de currículos com busca em tempo real por nome ou cargo
- Página de detalhes de currículo com exclusão local
- Formulário completo de cadastro de currículo
- Máscaras para CPF e telefone
- Campos dinâmicos para experiências profissionais
- Campos dinâmicos para formação acadêmica
- Validação de Yup para todos os campos importantes
- Feedback de sucesso e erro com Sonner
- Botões com estados hover, focus-visible e disabled no formulário
- Persistência mockada usando `localStorage`
- Upload fake de imagem com exibição do nome do arquivo selecionado

## Rotas principais

- `/` - Landing page
- `/sistema/paginas/curriculos` - Lista de currículos
- `/sistema/paginas/curriculos/novo` - Formulário de cadastro
- `/sistema/paginas/curriculos/[id]` - Detalhes do currículo

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador:

```bash
http://localhost:3000
```

## Repositório GitHub

O remoto foi configurado para:

```bash
git remote add origin https://github.com/Gabrielhenriquer/trabalho-sistema-de-curriculo.git
```

> Se desejar, faça o primeiro commit com:
>
> ```bash
> git add .
> git commit -m "Inicializa projeto Trabalho 2"
> git push -u origin main
> ```

## Observações

- A persistência é feita apenas no navegador com `localStorage`.
- O campo de upload de imagem é simulado: o arquivo não é enviado para servidor.
- Há um placeholder em `public/profile.svg` usado como imagem de perfil padrão.

## Comandos úteis

- `npm run dev` - iniciar o projeto em desenvolvimento
- `npm run build` - gerar a versão de produção
- `npm run start` - rodar o build de produção
- `npm run lint` - verificar o código com ESLint

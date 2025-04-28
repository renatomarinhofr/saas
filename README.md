# Next.js SaaS RBAC Application

Este é um projeto SaaS (Software as a Service) completo construído com Next.js, apresentando um robusto sistema de RBAC (Role-Based Access Control) para gerenciamento de organizações e projetos.

## Features

### Authentication

- [ ] It should be able to authenticate using e-mail & password;
- [ ] It should be able to authenticate using Github account;
- [ ] It should be able to recover password using e-mail;
- [x] It should be able to create an account (e-mail, name and password);

### Organizations

- [ ] It should be able to create a new organization;
- [ ] It should be able to get organizations to which the user belongs;
- [ ] It should be able to update an organization;
- [ ] It should be able to shutdown an organization;
- [ ] It should be able to transfer organization ownership;

### Invites

- [ ] It should be able to invite a new member (e-mail, role);
- [ ] It should be able to accept an invite;
- [ ] It should be able to revoke a pending invite;

### Members

- [ ] It should be able to get organization members;
- [ ] It should be able to update a member role;

### Projects

- [ ] It should be able to get projects within a organization;
- [ ] It should be able to create a new project (name, url, description);
- [ ] It should be able to update a project (name, url, description);
- [ ] It should be able to delete a project;

### Billing

- [ ] It should be able to get billing details for organization ($20 per project / $10 per member excluding billing role);

## RBAC

Roles & permissions.

### Roles

- Owner (count as administrator)
- Administrator
- Member
- Billing (one per organization)
- Anonymous

### Permissions table

|                        | Administrator | Member | Billing | Anonymous |
| ---------------------- | ------------- | ------ | ------- | --------- |
| Update organization    | ✅            | ❌     | ❌      | ❌        |
| Delete organization    | ✅            | ❌     | ❌      | ❌        |
| Invite a member        | ✅            | ❌     | ❌      | ❌        |
| Revoke an invite       | ✅            | ❌     | ❌      | ❌        |
| List members           | ✅            | ✅     | ✅      | ❌        |
| Transfer ownership     | ⚠️            | ❌     | ❌      | ❌        |
| Update member role     | ✅            | ❌     | ❌      | ❌        |
| Delete member          | ✅            | ⚠️     | ❌      | ❌        |
| List projects          | ✅            | ✅     | ✅      | ❌        |
| Create a new project   | ✅            | ✅     | ❌      | ❌        |
| Update a project       | ✅            | ⚠️     | ❌      | ❌        |
| Delete a project       | ✅            | ⚠️     | ❌      | ❌        |
| Get billing details    | ✅            | ❌     | ✅      | ❌        |
| Export billing details | ✅            | ❌     | ✅      | ❌        |

> ✅ = allowed
> ❌ = not allowed
> ⚠️ = allowed w/ conditions

#### Conditions

- Only owners may transfer organization ownership;
- Only administrators and project authors may update/delete the project;
- Members can leave their own organization;

## Estrutura do Projeto

O projeto está organizado em uma estrutura monorepo com as seguintes aplicações:

- `apps/api`: Backend da aplicação
- `apps/web`: Frontend da aplicação

## Pré-requisitos

- Node.js (versão LTS recomendada)
- Docker e Docker Compose
- pnpm (gerenciador de pacotes)

## Configuração do Ambiente

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd next-saas-rbac
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configuração do ambiente**

Crie os arquivos `.env` necessários:

Para a API (`apps/api/.env`):
```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/next-saas?schema=public"
JWT_SECRET_KEY="sua-chave-secreta"
GITHUB_CLIENT_ID="seu-github-client-id"
GITHUB_CLIENT_SECRET="seu-github-client-secret"
```

Para o frontend (`apps/web/.env.local`):
```env
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

## Rodando com Docker

1. **Inicie o banco de dados**
```bash
docker-compose up -d
```

2. **Execute as migrações do banco de dados**
```bash
cd apps/api
pnpm prisma migrate deploy
```

3. **Rode o seed (opcional)**
```bash
pnpm prisma db seed
```

## Rodando a Aplicação

1. **Inicie a API**
```bash
cd apps/api
pnpm dev
```

2. **Inicie o frontend**
```bash
cd apps/web
pnpm dev
```

A API estará disponível em `http://localhost:3333` e o frontend em `http://localhost:3000`.

## Funcionalidades Principais

- Autenticação completa (email/senha e GitHub)
- Sistema de organizações com múltiplos membros
- Controle de acesso baseado em funções (RBAC)
- Gerenciamento de projetos
- Sistema de convites para organizações
- Recuperação de senha
- Integração com GitHub

## Estrutura do Banco de Dados

O banco de dados possui as seguintes entidades principais:

- Users (Usuários)
- Organizations (Organizações)
- Members (Membros)
- Projects (Projetos)
- Invites (Convites)
- Accounts (Contas vinculadas)
- Tokens (Tokens de recuperação de senha)

## 🌐 Demo

- **Frontend**: [https://saas-web-theta.vercel.app](https://saas-web-theta.vercel.app)
- **API**: [https://saas-gndw.onrender.com](https://saas-gndw.onrender.com)

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

### Backend (API)
- **Fastify** - Framework web rápido e eficiente para Node.js
  - `@fastify/cors` - Suporte a CORS
  - `@fastify/jwt` - Autenticação JWT
  - `@fastify/swagger` - Documentação automática da API
- **Prisma ORM** - ORM moderno com suporte a TypeScript
- **PostgreSQL** (Neon.tech) - Banco de dados serverless PostgreSQL
- **TypeScript** - Superset JavaScript com tipagem estática
- **Zod** - Validação de schemas com TypeScript
- **bcryptjs** - Criptografia de senhas
- **Outras ferramentas**:
  - `tsx` - Executor de TypeScript com suporte a ESM
  - `tsup` - Bundler TypeScript
  - `faker` - Geração de dados fake para testes

### Frontend (WEB)
- **Next.js 15** - Framework React com suporte a Server Components
- **TypeScript** - Tipagem estática para JavaScript
- **TailwindCSS** - Framework CSS utility-first
- **Shadcn/UI** - Componentes React construídos com:
  - Radix UI - Componentes primitivos acessíveis
  - Class Variance Authority - Estilização dinâmica
  - Tailwind Merge - Merge de classes Tailwind
- **React Query** - Gerenciamento de estado e cache
- **Outras bibliotecas**:
  - `ky` - Cliente HTTP baseado em fetch
  - `dayjs` - Manipulação de datas
  - `next-themes` - Suporte a temas dark/light
  - `cookies-next` - Gerenciamento de cookies
  - `lucide-react` - Ícones

## 🏗️ Estrutura do Projeto

O projeto está organizado em uma estrutura monorepo com as seguintes aplicações:

- `apps/api`: Backend da aplicação
  - `/prisma` - Schemas e migrações do banco de dados
  - `/src/http` - Rotas e middlewares
  - `/src/lib` - Configurações e utilitários
  
- `apps/web`: Frontend da aplicação
  - `/app` - Rotas e páginas (App Router)
  - `/components` - Componentes reutilizáveis
  - `/lib` - Hooks e utilitários

## 🔧 Pré-requisitos

- Node.js (versão LTS recomendada)
- Docker e Docker Compose (para desenvolvimento local)
- pnpm (gerenciador de pacotes)

## 🛠️ Configuração do Ambiente

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd next-saas-rbac
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configuração do ambiente**

Crie os arquivos `.env` necessários:

Para a API (`apps/api/.env`):
```env
DATABASE_URL="sua-url-do-neon-tech"
JWT_SECRET_KEY="sua-chave-secreta"
GITHUB_OAUTH_CLIENT_ID="seu-github-client-id"
GITHUB_OAUTH_CLIENT_SECRET="seu-github-client-secret"
GITHUB_OAUTH_CLIENT_REDIRECT_URI="sua-url-de-callback"
```

Para o frontend (`apps/web/.env.local`):
```env
NEXT_PUBLIC_API_URL="sua-url-da-api"
```

## 🚀 Deploy

O projeto está configurado para deploy nas seguintes plataformas:

### Backend (API)
- **Plataforma**: [Render](https://render.com)
- **URL**: [https://saas-gndw.onrender.com](https://saas-gndw.onrender.com)
- **Banco de Dados**: [Neon.tech](https://neon.tech) - PostgreSQL Serverless

### Frontend (Web)
- **Plataforma**: [Vercel](https://vercel.com)
- **URL**: [https://saas-web-theta.vercel.app](https://saas-web-theta.vercel.app)

## 🐳 Desenvolvimento Local com Docker

1. **Inicie o banco de dados**
```bash
docker-compose up -d
```

2. **Execute as migrações do banco de dados**
```bash
cd apps/api
pnpm prisma migrate deploy
```

3. **Rode o seed (opcional)**
```bash
pnpm prisma db seed
```

## 🚀 Rodando a Aplicação Localmente

1. **Inicie a API**
```bash
cd apps/api
pnpm dev
```

2. **Inicie o frontend**
```bash
cd apps/web
pnpm dev
```

A API estará disponível em `http://localhost:3333` e o frontend em `http://localhost:3000`.

## 🔐 Funcionalidades Principais

- Autenticação completa (email/senha e GitHub)
- Sistema de organizações com múltiplos membros
- Controle de acesso baseado em funções (RBAC)
- Gerenciamento de projetos
- Sistema de convites para organizações
- Recuperação de senha
- Integração com GitHub

## 📝 Estrutura do Banco de Dados

O banco de dados possui as seguintes entidades principais:

- Users (Usuários)
- Organizations (Organizações)
- Members (Membros)
- Projects (Projetos)
- Invites (Convites)
- Accounts (Contas vinculadas)
- Tokens (Tokens de recuperação de senha)

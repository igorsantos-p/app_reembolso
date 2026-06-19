# App Reembolso

Aplicação frontend desenvolvida em React para gerenciamento de solicitações de reembolso corporativo.

O sistema permite que colaboradores realizem solicitações de reembolso, visualizem todos os pedidos e façam upload de comprovantes, enquanto gestores podem consultar e analisar as solicitações registradas.

## Demonstração

A aplicação consome uma API REST responsável pela autenticação, gerenciamento de usuários e controle dos reembolsos.

## Funcionalidades

### Autenticação

- Cadastro de usuários
- Login com autenticação JWT
- Persistência de sessão
- Logout

### Colaborador (Employee)

- Criar solicitação de reembolso
- Enviar comprovantes
- Consultar reembolsos cadastrados
- Visualizar detalhes da solicitação
- Paginação de registros

### Gestor (Manager)

- Consultar todos os reembolsos cadastrados
- Visualizar detalhes da solicitação
- Filtrar resultados
- Paginação de registros

### Interface

- Layout responsivo
- Feedback visual para ações do usuário
- Modais de confirmação
- Upload de arquivos
- Tratamento de erros

---

## Tecnologias Utilizadas

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Zod

### Estilização

- Tailwind CSS
- DaisyUI
- tailwind-merge

---

## Estrutura do Projeto

```text
src
├── assets
├── components
├── contexts
├── dtos
├── hooks
├── pages
├── routes
├── services
├── utils
├── App.tsx
└── main.tsx
```

### Organização

| Diretório | Responsabilidade |
|------------|------------------|
| assets | Imagens e ícones |
| components | Componentes reutilizáveis |
| contexts | Gerenciamento de estado global |
| dtos | Tipagens da aplicação |
| hooks | Hooks customizados |
| pages | Páginas da aplicação |
| routes | Configuração das rotas |
| services | Comunicação com a API |
| utils | Funções utilitárias |

---

## Fluxo da Aplicação

```text
Usuário
   │
   ▼
Login
   │
   ▼
JWT
   │
   ▼
AuthContext
   │
   ▼
Rotas Protegidas
   │
   ▼
Dashboard / Reembolsos
   │
   ▼
API Backend
```

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/igorsantos-p/app_reembolso.git
```

Acesse o diretório:

```bash
cd app_reembolso
```

Instale as dependências:

```bash
npm install
```

---

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3333
```

A URL deve apontar para a API de reembolsos.

---

## Executando o Projeto

Modo desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

---

## Build para Produção

Gerar build:

```bash
npm run build
```

---

## Controle de Acesso

O sistema utiliza autenticação baseada em JWT e controle de acesso por perfil.

### Employee

- Criar reembolsos
- Consultar seus registros

### Manager

- Consultar reembolsos cadastrados
- Gerenciar solicitações

---

## Componentes Desenvolvidos

- Button
- Input
- Select
- Upload
- Header
- Pagination
- Loading
- ConfirmModal
- RefundItem

Todos os componentes foram desenvolvidos com foco em reutilização e manutenção.

---

## Conceitos Aplicados

- React Context API
- Hooks Customizados
- Rotas Protegidas
- Autenticação JWT
- Controle de Acesso por Perfil (RBAC)
- Consumo de API REST
- Upload de Arquivos
- Paginação
- Componentização
- Tipagem com TypeScript
- Validação de Dados com Zod

---

## Backend Relacionado

Este frontend foi desenvolvido para consumir a API de reembolsos:

- API REST em Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Bcrypt
- JWT Authentication
- Zod

---

## Licença

Projeto desenvolvido para fins de estudo, prática e demonstração de competências em desenvolvimento Full Stack.

# ARCA RETRÔ — Projeto P2

## Descrição

O Arca Retrô é um sistema de e-commerce de produtos retrô, desenvolvido como trabalho acadêmico para a P1 e ampliado na P2 com backend, APIs REST e banco de dados.

## Tecnologias utilizadas

**Frontend**
- Angular 22
- TypeScript
- HTML e CSS

**Backend**
- Java 21
- Spring Boot 4.2.0
- Maven
- Spring Data JPA

**Banco de dados**
- PostgreSQL

## Funcionalidades implementadas

- Cadastro de clientes
- Login com verificação de senha
- Consulta e pesquisa de produtos
- Vitrine e detalhes dos produtos
- Cesta de compras
- Registro de pedidos
- Histórico de pedidos
- APIs CRUD de clientes, produtos e pedidos

## Estrutura do projeto

```text
arcaRetro/
├── frontend/
├── backend/
├── banco/
│   └── arca.backup
└── README.md
```

## Configuração do banco de dados

1. Instalar o PostgreSQL.
2. Criar um banco de dados chamado `arca`.
3. Restaurar o arquivo `banco/arca.backup` pelo pgAdmin 4.
4. Configurar a conexão em `backend/src/main/resources/application.properties`, informando o usuário e a senha do PostgreSQL.

A aplicação utiliza a porta `5432` para o PostgreSQL.

## Executar o backend

Requisitos: Java 21 e PostgreSQL.

No terminal, entrar na pasta `backend` e executar:

```cmd
mvnw.cmd spring-boot:run
```

O backend será iniciado em:

`http://localhost:8080`

## Executar o frontend

Requisitos: Node.js e npm.

No terminal, entrar na pasta `frontend` e executar:

```cmd
npm install
npm start
```

Acessar:

`http://localhost:4200`

É necessário manter o backend e o frontend em execução para utilizar as funcionalidades integradas.

## Endpoints principais

| Método | Endpoint | Funcionalidade |
|---|---|---|
| GET | `/api/produtos` | Listar produtos |
| GET | `/api/produto/{codigo}` | Consultar produto |
| POST | `/api/produto` | Cadastrar produto |
| PUT | `/api/produto` | Atualizar produto |
| DELETE | `/api/produto/{codigo}` | Excluir produto |
| GET | `/api/produto/vitrine` | Produtos em destaque |
| GET | `/api/produto/busca/{termo}` | Pesquisar produtos |
| POST | `/api/cliente` | Cadastrar cliente |
| POST | `/api/cliente/login` | Login |
| GET | `/api/cliente/{codigo}` | Consultar cliente |
| PUT | `/api/cliente` | Atualizar cliente |
| DELETE | `/api/cliente/{codigo}` | Excluir cliente |
| PATCH | `/api/cliente/alterarSenha` | Alterar senha |
| GET | `/api/pedidos` | Listar pedidos |
| POST | `/api/pedido` | Registrar pedido |
| GET | `/api/pedido/{codigo}` | Consultar pedido |
| PUT | `/api/pedido` | Atualizar pedido |
| DELETE | `/api/pedido/{codigo}` | Excluir pedido |

## Observações

O sistema foi desenvolvido para fins acadêmicos.

A recuperação de senha por e-mail ainda não está implementada. O login valida as credenciais, mas não oferece proteção completa de sessão no servidor. O pagamento é simulado, sem integração com serviços financeiros reais.

O projeto utiliza o banco PostgreSQL para persistência de clientes, produtos e pedidos.

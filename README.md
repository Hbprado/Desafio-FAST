# DESAFIO FAST

Este projeto é uma aplicação que implementa um frontend para consumir uma API para gerenciar workshops, incluindo funcionalidades como a criação, listagem, atualização e exclusão de workshops, bem como a associação de colaboradores. A API também suporta autenticação e autorização usando JWT.

### Tecnologias Utilizadas

- **Backend**: ASP.NET Core (C#)
- **Banco de Dados**: SQL Server (com Entity Framework Core)
- **Autenticação**: JWT (JSON Web Token)
- **Frontend**: React (com hooks e React Router)
- **Estilo**: Bootstrap

### Funcionalidades

- **CRUD de Workshops**: Criar, atualizar, visualizar e deletar workshops.
- **Gerenciamento de Participantes**: Associar colaboradores a workshops via email.
- **Autenticação**: Proteção das rotas da API com autenticação JWT.
- **Frontend**: Interface React para visualizar e adicionar workshops.

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/FastWorkshopsAPI.git
cd FastWorkshopsAPI
```
## 2. Configuração do Backend

### 2.1. Instalar as dependências
Instale as dependências do backend com o comando:

```bash
dotnet restore
```

### 2.2. Configurar Banco de Dados
Certifique-se de que o banco de dados SQL Server esteja configurado corretamente. Use o Docker para criar um container do SQL Server.
Certifique-se de ter o Docker instalado em sua máquina. Se não tiver, siga a [documentação oficial do Docker](https://docs.docker.com/get-docker/) para instalá-lo.

No terminal, execute o seguinte comando para criar e rodar um container MySQL:
```bash
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=sua-senha -e MYSQL_DATABASE=fastworkshops -p 3306:3306 -d mysql:8
```

Para verificar se o container MySQL foi criado e está rodando corretamente, use o comando:

```bash
docker ps
```

### 2.3. Definir Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto backend e adicione as seguintes variáveis para configuração:

```bash
JWT_SECRET=insira-uma-chave-longa-como-essa-para-garantir-o-funcionamento
MYSQL_PASSWORD=sua-senha-secreta
MYSQL_USER=root
```

### 2.4 Migrations
Se o banco de dados ainda não estiver configurado com as tabelas do seu modelo, será necessário rodar as migrations do Entity Framework Core para criar as tabelas no banco de dados. Para isso, siga os seguintes passos:

1. Criar uma Migration: Execute o comando abaixo para gerar uma migration inicial:

```bash
dotnet ef migrations add InitialCreate
```
2. Aplicar a Migration ao Banco de Dados: Depois de gerar a migration, aplique-a ao banco de dados com o comando:

```bash
dotnet ef database update
```

Este comando irá aplicar a migration e criar as tabelas necessárias no banco de dados.


### 2.5. Rodar a API
Depois de configurar o banco de dados, rode o projeto:

```bash
dotnet run
```

A API estará disponível em http://localhost:5192.

## 3.Configuração do Frontend

### 3.1. Instalar Dependências
Acesse o diretório do frontend e instale as dependências necessárias:

```bash
cd frontend
npm install
```

### 3.2. Rodar o Frontend
Execute o projeto frontend com:

```bash
npm start
```

O aplicativo estará disponível em http://localhost:3000.




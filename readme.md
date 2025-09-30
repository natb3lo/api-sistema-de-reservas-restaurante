# API de Sistema de Reservas de Restaurante

Este projeto é uma API RESTful para gerenciar reservas de mesas em um restaurante, com autenticação, validação de dados, controle de disponibilidade e logs padronizados.

## 🛠 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) - Ambiente de execução do backend
- [Express](https://expressjs.com/) - Framework para criação de APIs REST
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Sequelize](https://sequelize.org/) - ORM para interagir com o banco
- [JWT](https://jwt.io/) - Autenticação via JSON Web Tokens
- [Docker](https://www.docker.com/) - Containerização da aplicação (opcional)

## 🔑 Funcionalidades

### Autenticação de Usuário

- **Registro:** Usuário cadastra nome, e-mail e senha.
- **Login:** Usuário autenticado recebe um token JWT.
- **Restrição de Acesso:** Apenas usuários autenticados podem criar ou visualizar reservas.

### Gestão de Mesas

- **Listar Mesas:** Todas as mesas disponíveis e seus status.
- **Criar Mesa:** Apenas administradores podem adicionar novas mesas.
- **Atualizar/Remover Mesa:** Apenas administradores podem alterar ou remover mesas.
- **Status da Mesa:** Disponível, Reservada ou Inativa.

### Sistema de Reservas

- **Criar Reserva:** Usuários autenticados podem criar reservas para mesas específicas.
- **Verificar Disponibilidade:** A API verifica se a mesa está disponível no horário solicitado.
- **Cancelar Reserva:** Usuários podem cancelar suas reservas.
- **Controle de Status:** Mesas reservadas ficam automaticamente ocupadas; reservas podem ser Ativas ou Canceladas.

## 🗂 Estrutura do Banco de Dados

### Usuários

| Campo    | Tipo   | Observação              |
| -------- | ------ | ----------------------- |
| id       | UUID   | Identificador único     |
| name     | string | Nome do usuário         |
| email    | string | Único, usado para login |
| password | string | Hash da senha           |
| role     | string | `user` ou `admin`       |

### Mesas

| Campo    | Tipo    | Observação                             |
| -------- | ------- | -------------------------------------- |
| id       | UUID    | Identificador único                    |
| number   | integer | Número da mesa                         |
| capacity | integer | Máximo de pessoas                      |
| status   | string  | `AVAILABLE`, `RESERVED`, `UNAVAILABLE` |

### Reservas

| Campo       | Tipo     | Observação                          |
| ----------- | -------- | ----------------------------------- |
| id          | UUID     | Identificador único                 |
| userId      | UUID     | Referência ao usuário (Foreign Key) |
| tableNumber | integer  | Número da mesa (Foreign Key)        |
| date        | datetime | Data e hora da reserva              |
| duration    | integer  | Duração em minutos                  |
| status      | string   | `ACTIVE`, `CANCELED`                |

## 🔌 Endpoints da API

### Autenticação

| Método | Endpoint         | Descrição                      |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/register` | Cadastrar usuário              |
| GET    | `/auth/login`    | Login de usuário (retorna JWT) |

### Mesas

| Método | Endpoint      | Descrição                             |
| ------ | ------------- | ------------------------------------- |
| GET    | `/tables`     | Listar todas as mesas                 |
| POST   | `/tables`     | Criar uma nova mesa (admin)           |
| PATCH  | `/tables/:id` | Atualizar informações da mesa (admin) |
| DELETE | `/tables/:id` | Remover mesa (admin)                  |

### Reservas

| Método | Endpoint                   | Descrição                                |
| ------ | -------------------------- | ---------------------------------------- |
| POST   | `/reservations`            | Criar reserva (verifica disponibilidade) |
| GET    | `/reservations`            | Listar reservas do usuário               |
| DELETE | `/reservations/:id/cancel` | Cancelar reserva                         |

## 📝 Regras de Negócio

- **Disponibilidade:** Não é possível reservar uma mesa já ocupada no horário solicitado.
- **Validação de Capacidade:** Número de pessoas não pode exceder a capacidade da mesa.
- **Cancelamento:** Cancelar uma reserva libera a mesa.
- **Permissões:** Apenas administradores podem criar, atualizar ou remover mesas. Apenas o usuário que criou a reserva pode cancelá-la.
- **Validação de Dados:** Campos obrigatórios, formatos de e-mail, datas e horários, reservas apenas para horários futuros.

## 🚀 Como rodar

```bash
# Clone o repositório
git clone https://github.com/natb3lo/api-sistema-de-reservas-restaurante.git

# Acesse o diretório
cd api-sistema-de-reservas-restaurante

# Instale as dependências
npm install

# Crie um arquivo .env a partir do .env.example
# Edite .env com suas credenciais
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_banco
JWT_SECRET=uma_chave_secreta

# (Execute as migrations)
npx sequelize-cli db:migrate

# Rode a API
npm start
```

## 🔮 Próximos Passos

Este projeto ainda pode ser aprimorado. Algumas melhorias previstas incluem:

- **Dockerizar a aplicação**: Facilitar a execução e o deploy da API em qualquer ambiente, garantindo consistência e isolamento.
- **Documentar a API**: Criar documentação completa usando Swagger ou Postman, incluindo exemplos de requisições e respostas, para facilitar testes e compreensão dos endpoints.

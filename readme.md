# 🚧 API de Gerenciamento de Reservas de Mesas de Restaurante

API para o gerenciamente de um sistema de reservas de mesas de um restaurante.

## 📌 Status
Este projeto **ainda está em desenvolvimento**.  
Funcionalidades já implementadas:  
- [x] Estrutura inicial do projeto
- [X] Configuração do banco de dados e migrations
- [X] Autenticação de usuários

## 🛠️ Tecnologias
- Node.js 
- Express 
- PostgreSQL  
- Sequelize (ORM e Migrations)
- Docker

## 🚀 Como rodar
```bash
# Clone o repositório
git clone https://github.com/natb3lo/api-sistema-de-reservas-restaurante.git

# Acesse o diretório
cd api-sistema-de-reservas-restaurante

# Instale as dependências
npm install

# Configure o banco de dados
# (Edite .env com suas credenciais e execute migrations)
npm run migrate

# Rode a API
npm start

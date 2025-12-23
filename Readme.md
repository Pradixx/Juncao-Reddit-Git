# Junção Reddit/Git - Módulo de Registro de Ideas

Esta branch, `Reconfigurando-ideias`, representa uma reconfiguração arquitetural do projeto Junção Reddit/Git, focando na criação de um **Ideas Hub** (Hub de Ideias). A principal mudança é a migração do banco de dados relacional para o **MongoDB**, um banco de dados NoSQL, e a implementação de uma API RESTful para gerenciar ideias.

## Tecnologias Utilizadas

O projeto é construído com as seguintes tecnologias principais:

*   **Java 21**: Linguagem de programação.
*   **Spring Boot 3.5.1**: Framework principal.
*   **Spring Data MongoDB**: Para persistência de dados no MongoDB.
*   **Spring Security**: Para autenticação e autorização via JWT.
*   **JWT (Java-JWT)**: Para geração e validação de tokens de acesso.
*   **MongoDB**: Banco de dados NoSQL para armazenamento de ideias.
*   **Maven**: Gerenciamento de dependências.
*   **Lombok**: Redução de código boilerplate.
*   **SpringDoc/Swagger**: Para documentação da API.
*   **Postman (Todos os testes de requisição)**: https://documenter.getpostman.com/view/48435237/2sBXVZmtvc

## Funcionalidades Implementadas

A API Ideas Hub permite o gerenciamento completo de ideias, com autenticação obrigatória via JWT para todas as operações.

| Método | Endpoint | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ideas` | Cria uma nova ideia. O autor é definido pelo token JWT. | Autenticado |
| `GET` | `/api/ideas` | Lista todas as ideias cadastradas. | Autenticado |
| `GET` | `/api/ideas/{id}` | Busca uma ideia específica pelo seu ID. | Autenticado |
| `GET` | `/api/ideas/my-ideas` | Lista as ideias criadas pelo usuário autenticado. | Autenticado |
| `GET` | `/api/ideas/author/{authorId}` | Lista as ideias criadas por um autor específico (e-mail). | Autenticado |
| `PUT` | `/api/ideas/{id}` | Substitui completamente uma ideia existente. Requer que o usuário seja o autor. | Autenticado |
| `PATCH` | `/api/ideas/{id}` | Atualiza parcialmente uma ideia existente. Requer que o usuário seja o autor. | Autenticado |
| `DELETE` | `/api/ideas/{id}` | Deleta uma ideia. Requer que o usuário seja o autor. | Autenticado |

## Estrutura do Projeto

O projeto segue a arquitetura de camadas, com foco na separação de responsabilidades e na integração com o MongoDB:

```
src/main/java/com/redgit/registry/ideashub/
├── controller/
│   ├── IdeaController.java (Endpoints da API)
│   └── dto/ (Objetos de Transferência de Dados)
├── infrastructure/
│   ├── config/ (Configuração do MongoDB)
│   ├── entities/ (Modelo de Dados: Idea.java)
│   ├── repository/ (Interfaces de Repositório)
│   └── security/ (Configurações de Spring Security, JWT Filter)
└── service/ (Lógica de Negócio: IdeaService, TokenService)
```

## Configuração de Ambiente

O projeto utiliza variáveis de ambiente e arquivos de propriedades para a configuração do banco de dados e da chave secreta do JWT.

### 1. Variáveis de Ambiente (`.env`)

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo para a chave secreta do JWT:

```dotenv
JWT_SECRET=3246918694727278232479912314703835454208642542872406260685881546
```

### 2. Arquivo de Propriedades (`application.properties`)

O arquivo `src/main/resources/application.properties` importa as configurações do MongoDB e define a porta do servidor e a chave secreta do JWT.

```properties
spring.application.name=ideas-hub

# MongoDB
spring.config.import=mongo.properties

# Server
server.port=8082

# JWT
security.jwt.secret-key=${JWT_SECRET:my-secret-key-from-digito}
```

### 3. Configuração do MongoDB (`mongo.properties`)

O arquivo `mongo.properties` (que deve ser criado em `src/main/resources/`) contém a string de conexão para o cluster MongoDB.

```properties
spring.data.mongodb.connection-string=mongodb+srv://digito:GXylmjKyw0fAVkm4@project-ideas-cluster.dcrxch1.mongodb.net/ideas-db?retryWrites=true&w=majority
mongodb.databaseName=ideas-db
```

**Nota de Segurança**: A string de conexão fornecida é apenas para fins de aprendizado e desenvolvimento. Em produção, as credenciais devem ser gerenciadas de forma segura.

## Como Rodar o Projeto

### Pré-requisitos

*   **Java Development Kit (JDK) 21** ou superior.
*   **Maven**.
*   **Acesso ao Cluster MongoDB** (ou um servidor MongoDB local).

### Passos para Execução

1.  **Clone o repositório e mude para a branch:**

    ```bash
    git clone https://github.com/Pradixx/Juncao-Reddit-Git.git
    cd Juncao-Reddit-Git
    git checkout Reconfigurando-ideias
    ```

2.  **Configure o ambiente:**
    *   Crie e preencha o arquivo `.env` conforme a seção acima.
    *   Crie e preencha o arquivo `src/main/resources/mongo.properties` conforme a seção acima.

3.  **Compile e execute a aplicação:**

    ```bash
    ./mvnw clean install
    ./mvnw spring-boot:run
    ```

A aplicação será iniciada na porta `8082`.

## Exemplo de Uso (Criação de Ideia)

Para criar uma ideia, você precisa de um token JWT válido (obtido através de um serviço de autenticação, como o implementado na branch `Login-Register-Alpha`).

### 1. Criação de Ideia

```bash
# Substitua SEU_TOKEN_JWT pelo token real
curl -X POST http://localhost:8082/api/ideas \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN_JWT" \
-d '{"title": "Nova Funcionalidade", "description": "Implementar um sistema de votação nas ideias."}'
```

**Resposta de Sucesso (201 Created):**

```json
{
    "id": "65b21a8c8e8d9c001f0a0b1c",
    "title": "Nova Funcionalidade",
    "description": "Implementar um sistema de votação nas ideias.",
    "authorId": "email_do_usuario_do_token",
    "createdAt": "2024-01-25T10:00:00.000"
}
```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests no repositório.

## Licença

Este projeto está licenciado sob a licença MIT.

## Autor

**Diego Silva Prado e Daniel Macedo Silva**

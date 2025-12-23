# Junção Reddit/Git - Projeto de Estudo e Desenvolvimento

Este repositório, **Junção Reddit/Git**, é um projeto pessoal e de aprendizado contínuo, focado na aplicação prática de arquiteturas de software modernas, como **Microsserviços** e **APIs RESTful**, utilizando o ecossistema **Spring Boot** e **Java**.

O objetivo principal é simular a estrutura de uma plataforma social, como o Reddit, com foco inicial na construção de módulos de backend robustos e escaláveis.

## 💡 Foco em Aprendizado e Aperfeiçoamento

Este projeto é um **laboratório de estudos** onde as técnicas e as melhores práticas de desenvolvimento são constantemente aperfeiçoadas. A estrutura atual reflete a evolução do aprendizado, com a migração de bancos de dados relacionais para NoSQL e a adoção de padrões de segurança como JWT.

**Enfatizamos que o projeto está em desenvolvimento ativo e as branches refletem diferentes fases de estudo e reconfiguração.**

## Módulos Atuais

A branch `main` integra os seguintes módulos de backend, cada um focado em uma responsabilidade específica:

### 1. API - Cadastro e Login (Autenticação)

*   **Tecnologia Principal:** Spring Boot, Spring Security, JWT.
*   **Banco de Dados:** MySQL (configurado via JPA).
*   **Funcionalidade:** Gerenciamento de usuários, registro (USER e ADMIN) e autenticação via JSON Web Tokens (JWT).
*   **Endpoints Principais:** `/api/auth/register`, `/api/auth/login`.

### 2. API - Ideias Hub

*   **Tecnologia Principal:** Spring Boot, Spring Security, JWT.
*   **Banco de Dados:** MongoDB (NoSQL).
*   **Funcionalidade:** CRUD (Create, Read, Update, Delete) para o recurso "Ideia", permitindo que usuários autenticados criem e gerenciem suas propostas.
*   **Endpoints Principais:** `/api/ideas`.

## 🛠️ Tecnologias Comuns

Ambos os módulos compartilham um conjunto de tecnologias base:

*   **Linguagem:** Java 21
*   **Framework:** Spring Boot 3.x
*   **Segurança:** Spring Security e JWT (com `com.auth0:java-jwt`)
*   **Build Tool:** Maven
*   **Documentação:** SpringDoc/Swagger
*   **Postman (Todos os testes de requisição)**: https://documenter.getpostman.com/view/48435237/2sBXVZmtvc

## Próximos Passos (Roadmap)

O desenvolvimento futuro do projeto Junção Reddit/Git está focado em:

1.  **Desenvolvimento do Front-end com React:** Iniciar a construção de uma interface de usuário dinâmica e responsiva para consumir as APIs de backend.
2.  **Módulos Adicionais:** Implementar novos módulos de microsserviços para funcionalidades como:
    *   **Comentários e Votação:** Estrutura para interações sociais.
    *   **Notificações:** Sistema de alerta em tempo real.
3.  **Escalabilidade e Dinamismo:** Continuar a aperfeiçoar a arquitetura para garantir alta disponibilidade e desempenho, explorando tecnologias como **Spring Cloud** e **Docker Compose** para orquestração.

## Como Rodar o Projeto

Devido à estrutura de multi-módulos, cada API deve ser configurada e executada separadamente.

### 1. API - Cadastro e Login

*   **Porta:** `8081`
*   **Banco de Dados:** MySQL
*   **Configuração:** Necessita de um arquivo `.env` com as credenciais do MySQL e a chave `JWT_SECRET`.

### 2. API - Ideias Hub

*   **Porta:** `8082`
*   **Banco de Dados:** MongoDB
*   **Configuração:** Necessita de um arquivo `.env` com a chave `JWT_SECRET` e um arquivo `mongo.properties` com a string de conexão do MongoDB.

**Instruções de Execução:**

1.  Navegue até o diretório do módulo desejado (`API - Cadastro e Login` ou `API - Ideias Hub`).
2.  Configure os arquivos de ambiente necessários.
3.  Execute o comando: `./mvnw spring-boot:run`

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests no repositório.

## Licença

Este projeto está licenciado sob a licença MIT.

## Autor

**Diego Silva Prado e Daniel Macedo Silva**

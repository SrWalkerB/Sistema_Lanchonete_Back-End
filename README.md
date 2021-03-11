# API Lanchonete

# Conteudos

* [Sobre](#Sobre)
* [Features](#Features)
* [Geatting Started](#Geatting-Started)
* [Instalação](#instalacao)
* [Como usar](#como-usar)
* [Tecnologias](#tecnologias)

### A ideia é criar uma simples REST API de uma simples lanchonete

## Features

- [X] Cadastro de usuário ADMIN
- [X] Cadastro de funcionários e clientes
- [X] Cadastro de produtos
- [X] Envio de Recibos simples por email
- [X] Autenticação e autorização

# Getting started

## Instalando as dependecias

```
npm install
```

## Não esqueça de criar arquivo variaveis de ambiente na raiz do projeto

```
.env
```

## Rodando o projeto

```
npm run dev
```

```
npm start
```

## Como Usar

#### Primeiro entre na pasta de rotas de login e crie suas respectivas rotas. Em Seguida crie uma conta, a partir dela e do token adm é possível ter acesso as próximas rotas.

### Usuário ADM

#### Agora com ADM criado é possível criar suas respectivas congregações, entre nas rotas de ADM para criar suas rotas. Com ela crie primeiro a congregação e seguida crie um usuário para ela.

### User comum

#### Depois de criado um usuário com a rota ADM, realize login com user comum. Ele é o gerente da congregação atribuida, com ele é possível criar membros, gerenciar caixa e editar as informação da sua congregação responsável.

## Tecnologias

### Utilizei Node com PostgreSql

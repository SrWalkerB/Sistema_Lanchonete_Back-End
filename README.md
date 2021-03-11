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
- [X] Cadastro de produtos e realização de pedidos
- [X] Envio de Recibos simples por email
- [X] Autenticação Autorização

# Getting started

## Instalando as dependecias

```
npm install
```

## Criando variáveis de ambiente

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

#### Primeiro entre na pasta de rotas de login e crie suas respectivas rotas. Em Seguida crie uma conta da sua lanchonete.

### Usuário "ADM"

#### Agora com a lanchonete criada e usuário ADM é possível criar produtos (criar, alterar, deletar) e funcionários.

### Usuário "funcionário"

#### Com usuário funcionário é possível: listar produtos, alterar o status de pedidos, listar clientes.

### Usuário "cliente"

#### Esse é o usuário com mesmo privilégios, com ele é possível criar conta, visualizar cadastro e realizar pedidos.

## Tecnologias

### Utilizei Node com PostgreSql

# Instruções
## Inicie o docker
```bash
docker compose up -d
```

## Instale as dependências do node.
```bash
npm i
```

## Inicie o PrismaORM
```bash
npx prisma init
npx prisma migrate dev --name init
```

## Inicie o servidor
```bash
npm run dev
```

## Registrar Usuário
requisição post para:

```
POST http://localhost:3000/public/register
```

Dados do Body:

```
{
    "name": "Admin",
    "email": "admin@admin.com",
    "password": "admin"
}
```

## Login com Usuário

```
POST http://localhost:3000/public/login
```

Dados do Body:

```
{
    "email": "admin@admin.com",
    "password": "admin"
}
```

## Rotas autenticadas

As rotas presentes são:

```
GET http://localhost:3000/users/
GET http://localhost:3000/users/id/:id
POST http://localhost:3000/users/
PUT http://localhost:3000/users/id/:id
DELETE http://localhost:3000/users/id/:id
```

É necessário o Access Token para acessa-las.
O Token é retornado quando a autenticação é realizado via:

```
POST http://localhost:3000/public/login
```

A resposta da requisição é:
```
"accessToken": <Token de Acesso>
```

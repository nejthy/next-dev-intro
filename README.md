## install and init prisma with sqlite
```bash
npm install prisma --save-dev
npm install @prisma/client
npm install sqlite3
```

```bash
npx prisma init --datasource-provider sqlite
```

it will create a `prisma` folder with a `schema.prisma` file and a `.env` file.

## create a new model in schema.prisma
```prisma
model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

## generate prisma client
```bash
npx prisma generate
```

## migrate the database
```bash
npx prisma migrate dev --name init
```




// src/config/mysql.ts
export const mysqlDefaults: any = {
  database: 'pyetro',
  user: 'nodejs',
  password: 'sevensys',
  options: {
    host: 'mysql-nodejs.mauricioschmitz.com.br',
    port: 3307,
    dialect: 'mysql',
    operatorAliases: false
  }
}
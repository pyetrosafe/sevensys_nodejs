import Server from "../../server.class";
import * as dotenv from "dotenv";
import { sequelize } from "./config/mysql";

import app from "./app";

const PORT: Number | any = process.env.PRODUCTS_PORT || 3002;

(async () => {

  await sequelize.sync({force: false});

  const server = new Server(PORT, app);
})();

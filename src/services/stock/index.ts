import Server from "../../server.class";
import * as dotenv from "dotenv";

import app from "./app";

const PORT: Number | any = process.env.STOCK_PORT || 3001;

(async () => {
  const server = new Server(PORT, app);
})();

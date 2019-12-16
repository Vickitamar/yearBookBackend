import "reflect-metadata";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { join } from "path";
const parentDir = join(__dirname, "..");

const connectionOpts: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "rogue.db.elephantsql.com",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "prghnvqn",
  password: process.env.DB_PASSWORD || "FwUh5OcygTjdhWT7Dtz3T7tOvIpFlRtn",
  database: process.env.DB_NAME || "prghnvqn",
  entities: [`${parentDir}/**/*.entity.ts`],
  synchronize: true
};

const connection: Promise<Connection> = createConnection(connectionOpts);

export default connection;

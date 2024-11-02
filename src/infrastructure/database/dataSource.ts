import "reflect-metadata";
// todo: import configuration from "src/config/configuration"
import { DataSource } from "typeorm";
import { StockPriceEntity } from "@infrastructure/persistence/entity/stockPrice.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  entities: [StockPriceEntity],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrations: [],

  username: process.env.DATABASE_USER ?? "user",
  password: process.env.DATABASE_PASSWORD ?? "password",
  host: process.env.DATABASE_HOST ?? "postgres-db",
  database: process.env.DATABASE_DATABASE ?? "main",
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
});

AppDataSource.initialize()
  .then(() => {
    /** */
  })
  .catch((error) => console.log(error));

export default AppDataSource;

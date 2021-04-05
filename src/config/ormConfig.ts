import entities from "src/entities";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { DATABASE_CONFIG } from "./dotenv";

export const config= () => {
  const config: MysqlConnectionOptions = {
    type: 'mysql',
    ...DATABASE_CONFIG,
    entities: entities,
    synchronize: true,
  }
  
  return config;
}

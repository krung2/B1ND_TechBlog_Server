import 'dotenv/config';
import { DatabaseType } from 'typeorm';

const getValue = (key: string): string => {
  const value = process.env[key];

  if (value === undefined) {
    const errMessage = `${key} enviroment must be defined`;

    throw new Error(errMessage);
  }

  return value;
};

export const PORT = getValue('PORT');

export const DATABASE_CONFIG = {
  host: getValue('DATABASE_HOST'),
  port: parseInt(getValue('DATABASE_PORT')),
  username: getValue('DATABASE_USERNAME'),
  password: getValue('DATABASE_PASSWORD'),
  database: getValue('DATABASE_NAME'),
}
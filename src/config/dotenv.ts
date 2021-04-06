import 'dotenv/config';

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
  // tslint:disable-next-line: radix
  port: parseInt(getValue('DATABASE_PORT')),
  username: getValue('DATABASE_USERNAME'),
  password: getValue('DATABASE_PASSWORD'),
  database: getValue('DATABASE_NAME'),
}

export const JWT_SECRET = getValue('JWT_SECRET');

export const USER_KEY = getValue('USER_KEY');
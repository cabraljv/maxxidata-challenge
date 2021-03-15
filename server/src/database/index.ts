import { createConnection } from 'typeorm';

import config from '../config/database';

class Database {
  constructor() {
    this.initPostgres();
  }

  async initPostgres(): Promise<void> {
    try {
      await createConnection(config);
    } catch (error) {
      console.log('Erro ao conectar com o banco de dados', error);
    }
  }
}

export default new Database();

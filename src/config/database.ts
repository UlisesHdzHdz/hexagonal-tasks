import { Pool, PoolClient } from "pg";

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      password: "root",
      database: "librero",
      port: 5432,
    });

    this.connect();
  }

  private connect(): void {
    this.pool.connect((err: Error, client: PoolClient, done: () => void) => {
      if (err) {
        console.error("Error al conectar a la base de datos:", err);
      } else {
        console.log("Conexión exitosa a la base de datos");
        // Aquí puedes realizar operaciones adicionales después de que la conexión se haya establecido correctamente
      }
    });
  }

  public getPool(): Pool {
    return this.pool;
  }
}

export { Database };

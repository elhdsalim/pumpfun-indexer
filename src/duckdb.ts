import { DuckDBConnection, DuckDBInstance } from "@duckdb/node-api";
import { config } from "./config";

let conn: DuckDBConnection;

export async function getDuckDB() {
    if (!conn) {
        const instance = await DuckDBInstance.create(config.duckdb.path, { access_mode: "READ_ONLY" });
        conn = await instance.connect();
    }
    return conn;
}
import { DuckDBConnection, DuckDBInstance } from "@duckdb/node-api";
import { config } from "../config";

export type Row = { signature: string };

let conn: DuckDBConnection;

export async function getDuckDB() {
    if (!conn) {
        const instance = await DuckDBInstance.create(config.duckdb.path, { access_mode: "READ_ONLY" });
        conn = await instance.connect();
    }
    return conn;
}

function buildQuery(lastSignature: string | null, batchSize: number): string {
    if (lastSignature) {

        // replace(/'/g, "''") to protected against sqli 
        return `
            SELECT signature
            FROM signatures
            WHERE signature > '${lastSignature.replace(/'/g, "''")}'
            ORDER BY signature
            LIMIT ${batchSize};
        `;
    }
    return `
        SELECT signature
        FROM signatures
        ORDER BY signature
        LIMIT ${batchSize};
    `;
}

export async function fetchSignatures(lastSignature: string | null, batchSize: number): Promise<Row[]> {
    const duck = await getDuckDB();
    const sql = buildQuery(lastSignature, batchSize);
    const request = await duck.runAndReadAll(sql);
    return request.getRowObjectsJS() as Row[];
}

import { Row } from "./db/duckdb";

export function logBatch(iteration: number, rows: Row[], totalRows: number) {
    const first = rows[0].signature;
    const last = rows[rows.length - 1].signature;

    console.log(`[iter ${iteration}] rows=${rows.length} totalRows=${totalRows} first=${first} last=${last}`);
}

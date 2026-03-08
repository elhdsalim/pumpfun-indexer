import { fetchSignatures } from "./db/duckdb";
import { fetchAndParse } from "./rpc/parser";
import { logBatch } from "./utils";

const BATCH_SIZE = 1_000;
const ITERATIONS = 1500;

async function main() {
    let lastSignature: string | null = null;
    let totalRows = 0;

    for (let i = 1; i <= ITERATIONS; i++) {
        const rows = await fetchSignatures(lastSignature, BATCH_SIZE);

        if (rows.length === 0) {
            console.log(`Iteration ${i}: no more rows.`);
            break;
        }

        totalRows += rows.length;
        logBatch(i, rows, totalRows);

        for (const row of rows) {
            await fetchAndParse(row.signature);
        }

        lastSignature = rows[rows.length - 1].signature;
    }
}

main().catch(console.error);

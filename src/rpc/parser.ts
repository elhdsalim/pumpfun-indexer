import { DexParser } from "solana-dex-parser";
import { connection } from "./connections";

const parser = new DexParser();

export async function fetchAndParse(signature: string) {
    const tx = await connection.getTransaction(signature, {
        maxSupportedTransactionVersion: 0,
    });

    if (!tx) return;

    const result = parser.parseTrades(tx);
    console.log(result)


}

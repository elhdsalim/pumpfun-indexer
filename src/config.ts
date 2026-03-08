import "dotenv/config";

export const config = {
    rpcs: process.env["RPC_URLS"]?.split(","),
    clickhouse: {
        url: process.env["CLICKHOUSE_URL"],
        username: process.env["CLICKHOUSE_USERNAME"],
        password: process.env["CLICKHOUSE_PASSWORD"]
    },
    duckdb: {
        path: process.env["DUCKDB_PATH"] ?? `${process.env["HOME"]}/Documents/solindex/signatures.duckdb`,
    }
};
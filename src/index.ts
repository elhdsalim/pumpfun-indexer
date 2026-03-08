import { clickhouse } from "./clickhouse";
import { getDuckDB } from "./duckdb";

(async () => {
    const duck = await getDuckDB();
    const result = await duck.run("SHOW TABLES");
    console.log("DuckDB tables:", result.columnName(0));

    const chRows = await clickhouse.query({
        query: 'SELECT 1',
        format: 'JSONEachRow',
    })
    console.log('ClickHouse:', await chRows.json())
})()
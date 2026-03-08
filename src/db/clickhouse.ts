import { config } from "../config";
import { createClient } from '@clickhouse/client'

export const clickhouse = createClient({
    url: config.clickhouse.url,
    username: config.clickhouse.username,
    password: config.clickhouse.password,
})

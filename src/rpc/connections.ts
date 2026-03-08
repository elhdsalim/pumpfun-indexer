import { Connection } from "@solana/web3.js";
import rpcs from "../../rpcs.json";

export const connection = new Connection(rpcs[0]);

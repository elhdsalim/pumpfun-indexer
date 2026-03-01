package main

import (
	"context"
	"fmt"
	"time"

	"github.com/elhdsalim/pumpfun-indexer/config"
	"github.com/elhdsalim/pumpfun-indexer/indexer"
	"github.com/gagliardetto/solana-go/rpc"
)

func main() {

	cfg := config.LoadConfig()
	client := rpc.New(cfg.RPC[0])

	slot, err := client.GetSlot(context.Background(), rpc.CommitmentFinalized)
	if err != nil {
		fmt.Println(err)
	}

	oneMonthAgoSlot, err := indexer.GetDateSlot(context.Background(), client, time.Now().AddDate(0, -1, 0))
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(slot)
	fmt.Println(oneMonthAgoSlot)
}

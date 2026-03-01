package indexer

import (
	"context"

	"github.com/gagliardetto/solana-go/rpc"
)

func GetCurrentSlot(ctx context.Context, client *rpc.Client) (uint64, error) {
	return client.GetSlot(ctx, rpc.CommitmentConfirmed)
}

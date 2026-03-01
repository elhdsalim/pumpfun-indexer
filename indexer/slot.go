package indexer

import (
	"context"
	"time"

	"github.com/gagliardetto/solana-go/rpc"
)

func GetCurrentSlot(ctx context.Context, client *rpc.Client) (uint64, error) {
	return client.GetSlot(ctx, rpc.CommitmentConfirmed)
}

func GetDateSlot(ctx context.Context, client *rpc.Client, at time.Time) (uint64, error) {

	currentSlot, err := client.GetSlot(ctx, rpc.CommitmentFinalized)
	if err != nil {
		return 0, err
	}

	target := at.Unix()
	diff := time.Since(at).Seconds()
	estimated := int64(currentSlot) - int64(diff*2.5) // 2.5 because a slot in solana is approx 0.4s => 1/0.4=2.5

	low := max(0, estimated-1_000_000) // 1M to be sure that the slot is in it
	high := min(int64(currentSlot), estimated+1_000_000)
	closest := estimated

	for low <= high { // binary search
		mid := (low + high) / 2
		bt, err := client.GetBlockTime(ctx, uint64(mid))
		if err != nil || bt == nil {
			high = mid - 1
			continue
		}
		if bt.Time().Unix() == target {
			return uint64(mid), nil
		}
		if bt.Time().Unix() < target {
			low = mid + 1
			closest = mid
		} else {
			high = mid - 1
		}
	}
	return uint64(closest), nil
}

package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/gagliardetto/solana-go"
	"github.com/gagliardetto/solana-go/rpc"
)

func main() {

	RPC := "RPC/"
	PUMPFUN_PROGRAM_ID := "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
	TX_LIMIT := 10
	client := rpc.New(RPC)

	address := solana.MustPublicKeyFromBase58(PUMPFUN_PROGRAM_ID)

	sigs, err := client.GetSignaturesForAddressWithOpts(
		context.Background(),
		address,
		&rpc.GetSignaturesForAddressOpts{
			Limit: &TX_LIMIT,
		},
	)

	if err != nil {
		fmt.Println("error", err)
	}

	data, _ := json.MarshalIndent(sigs, "", "   ")
	fmt.Println(string(data))

}

package config

import (
	"os"
	"strings"
)

type Config struct {
	RPC []string
}

func LoadConfig() *Config {
	urls := strings.Split(os.Getenv("RPC_URLS"), ",")
	return &Config{
		RPC: urls,
	}
}

package main

import (
	"log/slog"
	logger "mono/pkg"
)

func main() {
	logger.Init("debug")
	slog.Info("dead")
}

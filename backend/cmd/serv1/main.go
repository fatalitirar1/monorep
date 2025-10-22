package main

import (
	"log/slog"
	"mono/pkg/logger"
)

func main() {
	logger.Init("degbug")
	slog.Info("dead")
}

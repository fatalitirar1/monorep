package main

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

func main() {
	for range 10000 {
		u := uuid.New()
		fmt.Println(u)
		time.Sleep(time.Second)
	}
}

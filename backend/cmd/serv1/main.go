package main

import (
	"fmt"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:

			fmt.Fprintf(w, "pong")
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
		}
	})
	server := http.Server{Addr: ":8080", Handler: mux}
	if err := server.ListenAndServe(); err != nil {
		panic(err)
	}
}

package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

func main() {

	mux := mux.NewRouter()
	mux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			fmt.Fprintf(w, "pong")
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/ping/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := strings.Trim(r.URL.Path, "/ping/")
		switch r.Method {
		case http.MethodGet:
			fmt.Println(id)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
		}
	})
	server := http.Server{Addr: ":8080", Handler: mux}
	if err := server.ListenAndServe(); err != nil {
		panic(err)
	}
}

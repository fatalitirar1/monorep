package server

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type Server struct {
	server http.Server
}

func Logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("started %s %s", r.Method, r.URL.Path)
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("completed in %v", time.Since(start))
	})
}

func New() {
	router := mux.NewRouter()
	router.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			fmt.Fprintf(w, "pong")
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
		}
	})

	router.HandleFunc("/ping/{id}", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			v := mux.Vars(r)
			fmt.Println(v["id"])
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
		}
	})

	router.Use(Logging)

	server := http.Server{Addr: ":8080", Handler: router}
	if err := server.ListenAndServe(); err != nil {
		panic(err)
	}
}

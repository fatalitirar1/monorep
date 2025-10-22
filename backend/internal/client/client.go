package handler

import (
	"log/slog"
	"net/http"
	"time"
)

type Client struct {
	Cl *http.Client
}

func New() *Client {
	return &Client{
		Cl: &http.Client{Timeout: time.Minute * 10},
	}
}

func (c Client) Do(r *http.Request) {
	slog.Info("client new Request",
		slog.String("URL", r.URL.Path))

	c.Cl.Do(r)
}

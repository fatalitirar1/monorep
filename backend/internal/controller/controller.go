package controller

import (
	"context"
	"encoding/json"
	"errors"
	"mono/internal/models"
	service_erros "mono/pkg/errors"
	"net/http"
)

type UserService interface {
	CreateUser(ctx context.Context, name, email string) (string, error)
	GetUser(ctx context.Context, id string) (models.UserResponse, error)
}

type UserHandler struct {
	svc UserService
}

func NewUserHandler(svc UserService) *UserHandler {
	return &UserHandler{svc: svc}
}

func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var req models.CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}

	//valideate!
	if req.Name == "" || req.Email == "" {
		http.Error(w, "name and email required", http.StatusBadRequest)
		return
	}

	id, err := h.svc.CreateUser(r.Context(), req.Name, req.Email)
	if err != nil {
		if errors.Is(err, service_erros.ErrEmailExists) {
			http.Error(w, "email already exists", http.StatusConflict)
			return
		}
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	resp := models.UserResponse{ID: id, Name: req.Name, Email: req.Email}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(resp)
}

func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		return
	}
	user, err := h.svc.GetUser(r.Context(), id)
	if err != nil {
		if errors.Is(err, service_erros.ErrNotFound) {
			http.Error(w, "not found", http.StatusNotFound)
			return
		}
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(user)
}

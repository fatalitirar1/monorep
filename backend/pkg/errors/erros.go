package service_erros

import "errors"

var ErrEmailExists = errors.New("email already exists")
var ErrNotFound = errors.New("Not found")

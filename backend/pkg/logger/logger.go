package logger

import (
	"context"
	"log/slog"
	"os"
	"strings"
)

type ctxKey string

const (
	slogFields ctxKey = "slog_fields"
)

type contextHandler struct {
	slog.Handler
}

func (h *contextHandler) Handle(ctx context.Context, r slog.Record) error {
	if attrs, ok := ctx.Value(slogFields).([]slog.Attr); ok {
		for _, v := range attrs {
			r.AddAttrs(v)
		}
	}

	return h.Handler.Handle(ctx, r)
}

func AppendCtx(ctx context.Context, attr slog.Attr) context.Context {
	if v, ok := ctx.Value(slogFields).([]slog.Attr); ok {
		v = append(v, attr)
		return context.WithValue(ctx, slogFields, v)
	}

	var v []slog.Attr
	v = append(v, attr)

	return context.WithValue(ctx, slogFields, v)
}

func Init(l string) {
	lvl := new(slog.LevelVar)
	lvl.Set(level(l))

	opts := &slog.HandlerOptions{Level: lvl}

	h := &contextHandler{slog.NewJSONHandler(os.Stdout, opts)}
	logger := slog.New(h)

	slog.SetDefault(logger)
	slog.Debug("debug level are enabled")
	slog.Info("Log", slog.String("level", l))
}

func level(level string) slog.Level {
	switch strings.ToLower(level) {
	case "debug":
		return slog.LevelDebug
	case "info":
		return slog.LevelInfo
	case "warn":
		return slog.LevelWarn
	case "error":
		return slog.LevelError
	default:
		return slog.LevelInfo
	}
}

func Err(err error) slog.Attr {
	return slog.Attr{
		Key:   "error",
		Value: slog.StringValue(err.Error()),
	}
}

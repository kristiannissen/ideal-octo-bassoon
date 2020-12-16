package handlers

import (
	"fmt"
	"net/http"
	t "github.com/kristiannissen/ideal-octo-bassoon/template"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset: utf-8")

    html := t.Parse("./static/templates/index.html", nil)

	fmt.Fprintf(w, html)
}

func HandleStatic(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello")
}

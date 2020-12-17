package handlers

import (
	"fmt"
	t "github.com/kristiannissen/ideal-octo-bassoon/template"
	"log"
	"net/http"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset: utf-8")
	log.Printf("Handler Hello")

	html := t.Parse("./static/templates/index.html", nil)

	fmt.Fprintf(w, html)
}

func SplashHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset: utf-8")

    html := t.Parse("./static/templates/index.html", nil)
    fmt.Fprint(w, html)
}

func PWAHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset: utf-8")

    html := t.Parse("./static/templates/pwa.html", nil)
    fmt.Fprint(w, html)
}

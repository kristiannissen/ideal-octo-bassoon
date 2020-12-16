package handlers

import (
	"fmt"
	t "github.com/kristiannissen/ideal-octo-bassoon/template"
	"io/ioutil"
	"log"
	"net/http"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset: utf-8")
	log.Printf("Handler Hello")

	html := t.Parse("./static/templates/index.html", nil)

	fmt.Fprintf(w, html)
}

func HandleStatic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset: utf-8")
	log.Printf("Handler HandleStatic")

	content, err := ioutil.ReadFile("./static/" + r.URL.Path)
	if err != nil {
		log.Printf("Error %e", err)
	}

	fmt.Fprintf(w, string(content))
}

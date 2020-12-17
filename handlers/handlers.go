package handlers

import (
	"fmt"
	t "github.com/kristiannissen/ideal-octo-bassoon/template"
	"log"
	"net/http"
    "io/ioutil"
    "encoding/json"
)

type Hop struct {
    Name string
    Substitutes string
    Betaacidcomposition string
    Purpose string
    Country string
    Alphaacidcomposition string
    Characteristics string
    Styleguide string
}

var Hops []Hop

func init() {
    // Read raw JSON into jsonString
    content, err := ioutil.ReadFile("./static/hopslist.json")
    if err != nil {
        log.Fatal(err)
    }

    json.Unmarshal([]byte(string(content)), &Hops)
}

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

func HopHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json; charset: utf-8")

    // Encode single hop
    jsonOut, _ := json.Marshal(Hops[0:1])
    fmt.Fprint(w, string(jsonOut))
}

func HopListHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json; charset: utf-8")

    // Encode data
    jsonOut, _ := json.Marshal(Hops)
    fmt.Fprint(w, string(jsonOut))
}

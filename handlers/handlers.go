package handlers

import (
	"fmt"
	t "github.com/kristiannissen/ideal-octo-bassoon/template"
	"log"
	"net/http"
    "io/ioutil"
    "encoding/json"
    str "strings"
    "net/url"
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
    // Find hop name
    // TODO: Should be done using context
    hopName, err := url.QueryUnescape(r.URL.Path[str.LastIndex(r.URL.Path, "/") + 1:])
    if err != nil {
        log.Println("Error decoding", err)
    }
    // Find hopname in slice
    var pos int = 0
    // Iterate over all hops
    for i, v := range Hops {
        // Compare lowercase to lowercase
        if str.ToLower(v.Name) == str.ToLower(hopName) {
            // Pos is now the index of the matching strings
            pos = i
        }
    }
    // Encode single hop
    jsonOut, _ := json.Marshal(Hops[pos])
    // Print out the string
    fmt.Fprint(w, string(jsonOut))
}

func HopListHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json; charset: utf-8")

    // Encode data
    jsonOut, _ := json.Marshal(Hops)
    fmt.Fprint(w, string(jsonOut))
}

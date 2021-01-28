package handlers

import (
	"encoding/json"
	"fmt"
	t "github.com/kristiannissen/ideal-octo-bassoon/template"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	str "strings"
)

type Hop struct {
	Name                 string
	Substitutes          string
	Betaacidcomposition  string
	Purpose              string
	Country              string
	Alphaacidcomposition string
	Characteristics      string
	Styleguide           string
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
	name := r.Context().Value("name")
	log.Println(name)

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
	hopName, err := url.QueryUnescape(r.Context().Value("name").(string))
	if err != nil {
		log.Println("Error decoding", err)
	}
	// Pos is -1 to indicate we didn't find any matching hops
	var pos int = -1
	// Iterate over all hops
	for i, v := range Hops {
		// Compare lowercase to lowercase
		if str.ToLower(str.Trim(v.Name, " ")) == str.ToLower(hopName) {
			// Pos is now the index of the matching strings
			pos = i
		}
	}
	hop := Hop{}

	if pos == -1 {
		// Hop was not found
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	} else {
		hop = Hops[pos]
		// Encode single hop
		jsonOut, _ := json.Marshal(hop)
		// Print out the string
		fmt.Fprint(w, string(jsonOut))
	}
}

func HopListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset: utf-8")

	// Encode data
	jsonOut, _ := json.Marshal(Hops)
	fmt.Fprint(w, string(jsonOut))
}

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset: utf-8")
	hoplist := make([]Hop, 0)
	// Take hop name from URL
	hopName, err := url.QueryUnescape(r.Context().Value("name").(string))
	if err != nil {
		log.Println("Error decoding", err)
	}

	for _, v := range Hops {
		// Compare lowercase to lowercase
		if str.Contains(str.ToLower(str.Trim(v.Name, " ")), str.ToLower(hopName)) {
            // Name contains hopName
			hoplist = append(hoplist, v)
		}
	}
	// Encode data
	jsonOut, _ := json.Marshal(hoplist)
	fmt.Fprint(w, string(jsonOut))
}

// Interface for mixed entries
type Data interface{}

func DashboardHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset: utf-8")

	data := make(map[string]Data)
	data["NumberOfHops"] = len(Hops)

	fi, err := os.Stat("./static/hopslist.json")
	if err != nil {
		log.Println("Could not open file")
	}
	data["FileModTime"] = fi.ModTime()

	hopsData := make(map[string]Data)

	for _, v := range Hops {
		country := str.Trim(v.Country, " ")

		if country == "" {
			country = "Unknown"
		}

		if _, found := hopsData[country]; found {
			hopsData[country] = hopsData[country].(int) + 1
		} else {
			hopsData[country] = 1
		}
	}

	data["HopsData"] = hopsData

	jsonOut, _ := json.Marshal(data)
	fmt.Fprint(w, string(jsonOut))
}

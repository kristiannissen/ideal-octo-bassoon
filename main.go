package main

import (
	"os"
    "fmt"
	"log"
	"net/http"
	"regexp"
	str "strings"
)

type Param struct {
	Key string
	Val string
}

var Params []Param = []Param{}

func AddParam(key, val string) []Param {
	return append(Params, Param{Key: key, Val: val})
}

func GetParam(key string) string {
	for _, p := range Params {
		if p.Key == key {
			return p.Val
		}
	}
	return ""
}

type Handle func(http.ResponseWriter, *http.Request)

type Route struct {
	routes map[string]Handle
}

func NewRoute() *Route {
	return &Route{routes: make(map[string]Handle)}
}

func (route *Route) HandleFunc(
	pattern string, f func(http.ResponseWriter, *http.Request)) {
	route.routes[pattern] = f
}

func (route *Route) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Iterate through routes
	for pattern, handler := range route.routes {
		// Does p contain regexp
		reg := regexp.MustCompile(`\{([a-z0-9]+)\}`)
		// Find groups matching
		groups := reg.FindAllStringSubmatch(pattern, -1)
		// If groups has len > 0
		if len(groups) > 0 {
			for _, v := range groups {
				pattern = str.ReplaceAll(pattern, v[0], "(?P<"+v[1]+">[a-zA-Z0-9]+)")
			}
		}
		// Escape / append ^ prepend $
		pattern = "(?m)^" + str.ReplaceAll(pattern, "/", "\\/") + "$"
		reg = regexp.MustCompile(pattern)
		match := reg.FindStringSubmatch(r.URL.Path)
		if len(match) > 0 {
			for i, name := range reg.SubexpNames() {
				if i > 0 {
					Params = AddParam(name, match[i])
				}
			}
			handler(w, r)
			return
		}
	}
	http.NotFound(w, r)
}

func HelloKitty(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")

	fmt.Fprintf(w,
		"Hello Kitty path %s method %s, param %s",
		r.URL.Path,
		r.Method,
		GetParam("key1"),
	)
}

func main() {
	var port string = os.Getenv("PORT")

	if port == "" {
		port = "80"
	}

	route := NewRoute()
	route.HandleFunc("/", HelloKitty)
	route.HandleFunc("/hello/", HelloKitty)
	route.HandleFunc("/hello/{key0}/", HelloKitty)
	route.HandleFunc("/hello/{key1}/eatmy/{key2}/", HelloKitty)

	log.Fatal(http.ListenAndServe(":"+port, route))
}

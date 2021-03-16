package router

import (
	"context"
	"log"
	"net/http"
	"regexp"
	str "strings"
)

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
		// log.Printf("URL incoming %s", r.URL.Path)
		if str.Index(r.URL.Path, ".") > 0 {
			fs := http.FileServer(http.Dir("./static"))
			fs.ServeHTTP(w, r)
			return
		}
		// Does p contain regexp
		reg := regexp.MustCompile(`\{([a-z0-9]+)\}`)
		// Find groups matching
		groups := reg.FindAllStringSubmatch(pattern, -1)
		// If groups has len > 0
		if len(groups) > 0 {
			for _, v := range groups {
				pattern = str.ReplaceAll(pattern, v[0], "(?P<"+v[1]+">[a-zA-Z0-9\\(\\)i\\s\\S]+)")
			}
		}
		// Escape / append ^ prepend $
		pattern = "(?m)^" + str.ReplaceAll(pattern, "/", "\\/") + "$"
		// log.Println(pattern)
		reg = regexp.MustCompile(pattern)
		match := reg.FindStringSubmatch(r.URL.Path)
		if len(match) > 0 {
			log.Printf("Match URL %s pattern %s", r.URL.Path, pattern)
			ctx := r.Context()

			for i, name := range reg.SubexpNames() {
				if i > 0 {
					// Params = AddParam(name, match[i])
					// log.Printf("key %s val %s", name, match[i])
					ctx = context.WithValue(r.Context(), name, match[i])
				}
			}
			handler(w, r.WithContext(ctx))
			return
		}
	}
	// Log 404 error
	log.Fatalf("URL '%s' not found", r.URL.Path)

	http.NotFound(w, r)
}

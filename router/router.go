package router

import (
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

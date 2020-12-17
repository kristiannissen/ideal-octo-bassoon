package main

import (
	h "github.com/kristiannissen/ideal-octo-bassoon/handlers"
	r "github.com/kristiannissen/ideal-octo-bassoon/router"
	"log"
	"net/http"
	"os"
)

func middle(n http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("URL.Path " + r.URL.Path)
		n.ServeHTTP(w, r)
	})
}

func main() {
	var port string = os.Getenv("PORT")

	if port == "" {
		port = "80"
	}

	route := r.NewRoute()
	route.HandleFunc("/", h.SplashHandler)
	route.HandleFunc("/pwa", h.PWAHandler)

	log.Fatal(http.ListenAndServe(":"+port, route))
}

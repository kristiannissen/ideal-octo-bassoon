package main

import (
	h "github.com/kristiannissen/ideal-octo-bassoon/handlers"
	r "github.com/kristiannissen/ideal-octo-bassoon/router"
	"log"
	"net/http"
	"os"
)

func main() {
	var port string = os.Getenv("PORT")

	if port == "" {
		port = "80"
	}

	route := r.NewRoute()
	route.HandleFunc("/", h.Hello)

	log.Fatal(http.ListenAndServe(":"+port, route))
}

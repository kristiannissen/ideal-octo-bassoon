package main

import (
	"github.com/kristiannissen/ideal-octo-bassoon/handlers"
	"github.com/kristiannissen/ideal-octo-bassoon/router"
	"log"
	"net/http"
	"os"
)

func main() {
	var port string = os.Getenv("PORT")

	if port == "" {
		port = "80"
	}

	route := NewRoute()
	route.HandleFunc("/", handlers.Hello)
	route.HandleFunc("/hello/", HelloKitty)
	route.HandleFunc("/hello/{key0}/", HelloKitty)
	route.HandleFunc("/hello/{key1}/eatmy/{key2}/", HelloKitty)

	log.Fatal(http.ListenAndServe(":"+port, route))
}

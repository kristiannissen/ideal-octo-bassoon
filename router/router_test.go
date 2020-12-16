package router

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestServeHTTP(t *testing.T) {
	tests := []struct {
		path, want string
	}{
		{"/hello", "Hello"},
		{"/hello/pussy", "Hello pussy"},
		{"/hello/pussy/kitty", "Hello kitty you have a pussy"},
        {"/css/style.css", "Hello Kitty"},
        {"/js/js.js", "Hello Kitty"},
	}

	router := NewRoute()

	router.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello")
	})

	router.HandleFunc("/hello/{name}", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello "+GetParam("name"))
	})

	router.HandleFunc("/hello/{name}/{gen}", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello %s you have a %s", GetParam("gen"), GetParam("name"))
	})

    router.HandleFunc("/*.*", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello Kitty")
    })

	for _, test := range tests {
		r := httptest.NewRequest("GET", test.path, nil)
		w := httptest.NewRecorder()

		router.ServeHTTP(w, r)

		resp := w.Result()
		body, _ := ioutil.ReadAll(resp.Body)

		got := string(body)

		if test.want != got {
			t.Errorf("got %s, want %s", got, test.want)
		}
	}
}

package router

import (
    "testing"
    "net/http/httptest"
    "net/http"
    "fmt"
    "io/ioutil"
)

func TestServeHTTP(t *testing.T) {
    tests := []struct{
        path, want string
    }{
        {"/hello", "Hello"},
        {"/hello/pussy", "Hello pussy"},
        {"/hello/pussy/kitty", "Hello kitty you have a pussy"},
    }

    router := NewRoute()

    router.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello")
    })

    router.HandleFunc("/hello/{name}", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello "+ GetParam("name"))
    })

    router.HandleFunc("/hello/{name}/{gen}", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello %s you have a %s", GetParam("gen"), GetParam("name")) 
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

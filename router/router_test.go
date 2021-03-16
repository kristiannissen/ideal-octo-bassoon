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
		{"/hello/Bate's%20Brewer", "Hello Bate's Brewer"},
		{"/hello/BRU-1", "Hello BRU-1"},
		{"/hello/Zeus", "Hello Zeus"},
	}

	router := NewRoute()

	router.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello")
	})

	router.HandleFunc("/hello/{name}", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello %s", r.Context().Value("name"))
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

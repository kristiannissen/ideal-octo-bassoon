package handlers

import (
	"io/ioutil"
	"net/http/httptest"
	"testing"
)

func TestHello(t *testing.T) {
	r := httptest.NewRequest("GET", "http://localhost/", nil)
	w := httptest.NewRecorder()

	Hello(w, r)

	resp := w.Result()
	body, _ := ioutil.ReadAll(resp.Body)

	got := string(body)
	want := "Hello Kitty"

	if got != want {
		t.Errorf("got %s want %s", got, want)
	}
}

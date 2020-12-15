package handlers

import (
    "testing"
    "net/http/httptest"
    "io/ioutil"
)

func TestHello(t *testing.T) {
    r := httptest.NewRequest("GET", "http://localhost/", nil)
    w := httptest.NewRecorder()

    Hello(w, r)

    resp := w.Result()
    body, _ := ioutil.ReadAll(resp.Body)

    got := string(body)
    want := "hallo"

    if got != want {
        t.Errorf("got %s want %s", got, want)
    }
}

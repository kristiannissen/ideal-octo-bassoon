package template

import (
    "testing"
)

func TestParse(t *testing.T) {
    var got, want string
    got = Parse("../static/templates/hello.gohtml")
    want = "Hello Kitty"

    if got != want {
        t.Errorf("got %s want %s", got, want)
    }
}

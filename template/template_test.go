package template

import (
    "testing"
)

func TestParse(t *testing.T) {
    var got, want string
    got = Parse("../static/templates/hello.gohtml", nil)
    want = "Hello <no value>"

    if got != want {
        t.Errorf("got %s want %s", got, want)
    }
}

func TestParseData(t *testing.T) {
    var got, want string
    names := struct{
        Name string
    }{Name: "Kitty"}
    want = "Hello Kitty"

    got = Parse("../static/templates/hello.gohtml", names)

    if got != want {
        t.Errorf("got %s want %s", got, want)
    }
}

package template

import (
    "log"
    "text/template"
)

func Parse(templatename string) (string, err) {
    var buf bytes.Buffer

    tpl := template.Must(template.ParseFiles(templatename))
    err := tpl.Execute(buf, nil)

    if err != nil {
        return "", err
    }

    return buf, nil
}

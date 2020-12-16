package template

import (
    "log"
    "text/template"
    "bytes"
    "strings"
)

func Parse(templatename string) string {
    var buf bytes.Buffer

    tpl := template.Must(template.ParseFiles(templatename))
    err := tpl.Execute(&buf, nil)

    if err != nil {
        log.Println(err)
        return ""
    }

    return strings.TrimSpace(buf.String())
}

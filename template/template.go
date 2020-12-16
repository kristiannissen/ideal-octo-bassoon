package template

import (
    "log"
    "text/template"
    "bytes"
    "strings"
)

func Parse(templatename string, data interface{}) string {
    var buf bytes.Buffer

    tpl := template.Must(template.ParseFiles(templatename))
    err := tpl.Execute(&buf, data)

    if err != nil {
        log.Printf("Parse error %s", err)

        return ""
    }

    return strings.TrimSpace(buf.String())
}

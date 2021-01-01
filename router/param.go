package router

import "log"

type Param struct {
	Key string
	Val string
}

var Params []Param = []Param{}

func AddParam(key, val string) []Param {
	return append(Params, Param{Key: key, Val: val})
}

func GetParam(key string) string {
	for _, p := range Params {
		if p.Key == key {
			return p.Val
		}
	}
	return ""
}

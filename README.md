# Super simple HTTP Router
This router is inspired by the infamous httprouter and mux, but also from work with frameworks like django (yes, Python!).

It gives you one, just one, option when it comes to creating handlers
HandleFunc! The option os using Handle is not implemented because I didn't really feel I had a need for it in what I am building.

## How to use it
```
import (
  r "router"
  ...
)

router := r.NewRoute()
router.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "Hello Kitty")
})

ListenAndServe(":", router)
```

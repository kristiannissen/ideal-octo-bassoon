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
You can also access parameters from the URL like this
```
router.HandleFunc("/hello/{kitty}", func(...))
```
And then access the paramter key kitty using GetParam(keyname string) like this
```
router.HandleFunc("/hello/{name}", func(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "Hello %s", GetParam("name")) 
})
```

## Why not implement method specific handlers?
Inspired by Google webrequest framework for Python I decided to go with handlers that are method agnostic so that both GET, PUT, DELETE and POST can be handled by the same HandleFunc.

This approach gives you the option of implementing similar to the following when you handle a POST request
````
func HelloKitty(w http.ResponseWriter, r *http.Request) {
  if r.Method == "POST" {
    // Create something in a database
    ...
  }
  // Fetch whatever you keep in your database and return it including what you just created
  ...
}
````
And if the same HandleFunc receives a GET request it returns a list of whatever you keep in your database.
This way you have less HandleFuncs to write. and you can easily dispatch to other functions based on method using a switch.

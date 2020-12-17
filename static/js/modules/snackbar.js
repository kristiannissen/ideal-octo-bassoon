/**
 * @file snackbar.js
 */
const Snackbar = (elmId, msg) => {
    let x = document.getElementById(elmId);
    x.innerText = msg
    x.className = "show";
    setTimeout(() => {
        x.className = x.className.replace("show", "");
        x.innerText = "";
    }, 3000)
}

export function showSnackbar(elmId, msg) {
    Snackbar(elmId, msg);
};

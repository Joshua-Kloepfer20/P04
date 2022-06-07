var clamp = (n, min, max) => {
    if (n < min) {
        return min
    } else if (n > max) {
        return max
    }
    return n;
}

var debug = (text) => {
    if (DEBUG) {
        console.log(text);
    }
}
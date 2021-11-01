export function getCookie(name) {
    var cookieArr = document.cookie.split(";"); // Split cookie string and get all individual name=value pairs in an array
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        // Removing whitespace at the beginning of the cookie name and compare it with the given string
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]); // Decode the cookie value and return
        }
    }
    return null;
}

export function setCookie(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);     // Encode value in order to escape semicolons, commas, and whitespace
    if(typeof daysToLive === "number") {       
        cookie += "; max-age=" + (daysToLive*24*60*60); // Sets the max-age attribute so that the cookie expires after the specified number of days
        document.cookie = cookie;
    }
}

export function deleteCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
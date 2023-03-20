export default function(e) {
    var defaultLocation = "http://localhost:8000";
    var oldHash = window.location.hash;

    history.back(); // Try to go back

    console.log(history)
    var newHash = window.location.hash;
    if (newHash === oldHash && (typeof(document.referrer) !== "string" || document.referrer === "")) {
        window.setTimeout(function() {
            console.log('redirect to default location')
            window.location.href = defaultLocation;
        }, 1000);
    }
    if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.preventPropagation) e.preventPropagation();
    }
    return false; // stop event propagation and browser default event
}

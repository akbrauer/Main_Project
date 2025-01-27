const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = ["https://api.nasa.gov/"];
const fontSrcUrls = [];

module.exports = {
    directives: {
        defaultSrc: [],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", "blob:"],
        objectSrc: [],
        imgSrc: [
            "'self'",
            "blob:",
            "data:",
            "https://somethingaboutsandwiches.com/",
            "https://minimalistbaker.com/",
            "https://theplantbasedschool.com/",
            "https://i0.wp.com/www.sweetandsorrel.com/",
            // "https://images.unsplash.com/",
            "https://res.cloudinary.com/dviijvxfy/",
            "https://apod.nasa.gov/",
        ],
        fontSrc: ["'self'", ...fontSrcUrls],
    },
}
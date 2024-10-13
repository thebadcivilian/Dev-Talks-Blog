const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]; // Access the cookie value

        if (!tokenCookieValue) {
            return next(); // If no cookie, immediately move to the next middleware
        }

        try {
            const userPayload = validateToken(tokenCookieValue); // Validate token and get the payload
            req.user = userPayload; // Attach user payload to the request object
        } catch (error) {
            // Handle invalid token error if needed (e.g., log the error, send a response, etc.)
            // You can optionally end the request-response cycle here if necessary
            console.error('Token validation failed:', error);
        }

        next(); // Proceed to the next middleware
    };
}

module.exports = {
    checkForAuthenticationCookie
};

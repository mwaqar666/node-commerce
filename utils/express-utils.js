/**
 * 1) Calls the middleware function on request except starting
 * from the provided path
 */
const except = (path, middleware) => {
    return (request, response, next) => request.url.startsWith(path) ? next() : middleware(request, response, next);
};

/**
 * 2) Overrides the method request body and uses the method
 * provided on "_method" field
 */
const overrideRequestMethodIfProvidedExplicitly = () => {
    return (request, response, next) => {
        if (request.body && typeof request.body === 'object' && '_method' in request.body && request.method.toUpperCase() === 'POST') {
            request.method = request.body._method.toUpperCase();
        }

        next();
    }
};

/**
 * 3) Set the custom "_method" input field with provided
 * method
 */
const _method = method => `<input type="hidden" name="_method" value="${method.toUpperCase()}">`;

exports.except = except;
exports._method = _method;
exports.overrideRequestMethodIfProvidedExplicitly = overrideRequestMethodIfProvidedExplicitly;

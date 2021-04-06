class ExpressUtilities {
    /**
     * 1) Calls the middleware function on request except starting
     * from the provided path
     */
    except(path, middleware) {
        return (request, response, next) => request.url.startsWith(path) ? next() : middleware(request, response, next);
    };

    /**
     * 2) Overrides the method request body and uses the method
     * provided on "_method" field
     */
    overrideRequestMethodIfProvidedExplicitly() {
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
    _method(method) {
        return `<input type="hidden" name="_method" value="${method.toUpperCase()}">`;
    };
}

module.exports = new Proxy(ExpressUtilities, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});
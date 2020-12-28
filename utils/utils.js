const trim = (string, character, repeated = false) => {
    if (string[0] === character) {
        string = string.slice(1);
        if (repeated) return trim(string, character, repeated);
    }

    if (string[string.length - 1] === character) {
        string = string.slice(0, string.length - 1);
        if (repeated) return trim(string, character, repeated);
    }

    return string;
};

const stringSegment = (string, separator, segment = null) => {
    const splittedString = string.split(separator).filter(part => !!part);
    if (segment) {
        return splittedString[segment];
    }

    return splittedString;
};

const createSlug = string => string.split(' ').filter(word => !!word).map(word => word.trim().toLowerCase()).join('-');


/**
 * Express Helpers
 * ===============
 */
const except = (path, middleware) => {
    return (request, response, next) => request.url.startsWith(path) ? next() : middleware(request, response, next);
};


exports.trim = trim;
exports.except = except;
exports.createSlug = createSlug;
exports.stringSegment = stringSegment;

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

module.exports.trim = trim;
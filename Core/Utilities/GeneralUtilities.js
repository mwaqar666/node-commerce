class GeneralUtilities {

    /**
     * 1) Trim character from start and end of string
     */
    trim(string, character, repeated = false) {
        if (!(string instanceof String) && typeof string !== 'string') {
            return string;
        }

        if (string[0] === character) {
            string = string.slice(1);
            if (repeated) return this.trim(string, character, repeated);
        }

        if (string[string.length - 1] === character) {
            string = string.slice(0, string.length - 1);
            if (repeated) return this.trim(string, character, repeated);
        }

        return string;
    }

    /**
     * 2) Segment the string from the provided delimiter. If segment index
     * is provided then return that specific segment, otherwise, return
     * the whole segmented array
     */
    stringSegment(string, separator, segment = null) {
        const splittedString = string.split(separator).filter(part => !!part);
        if (segment) {
            return splittedString[segment];
        }

        return splittedString;
    }

    /**
     * 3) Javascript implementation of PHP's "ucfirst(str)"
     */
    ucfirst(string) {
        if (typeof string === 'string') {
            return `${string[0].toUpperCase()}${string.substr(1)}`;
        }

        throw new Error('Invalid input');
    }

    /**
     * 4) Convert String From One Case To Another Case
     * ----------------------------------------------------------------------------
     * Current Support: Camel Case, Kebab Case, Snake Case, Pascal Case, Space Case
     */
    convertCase(string, fromCaseString, toCaseString) {
        const caseSplitters = { kebabCase: '-', snakeCase: '_', spaceCase: ' ' };
        const stringCases = ['kebabCase', 'snakeCase', 'spaceCase', 'pascalCase', 'camelCase'];

        if (! stringCases.includes(fromCaseString) || ! stringCases.includes(toCaseString)) {
            throw new Error('Please specify valid case: kebabCase | snakeCase | spaceCase | pascalCase | camelCase');
        }

        let inputStringCache = [];

        if (['kebabCase', 'snakeCase', 'spaceCase'].includes(fromCaseString)) {
            inputStringCache = string.split(caseSplitters[fromCaseString]).map(word => word.trim().toLowerCase());
        }

        else {
            const inputStringCharacters = string.split('');
            const capitalLettersAsciiRange = this.range(90, 65);

            let tempInputStringCharacter = [];
            inputStringCharacters.forEach((character, index, loopedOverArray) => {
                tempInputStringCharacter.push(character);
                if (
                    index + 1 === loopedOverArray.length ||
                    capitalLettersAsciiRange.includes(loopedOverArray[index + 1].charCodeAt(0))
                ) {
                    inputStringCache.push(tempInputStringCharacter.join('').trim().toLowerCase());
                    tempInputStringCharacter.length = 0;
                }
            });
        }

        if (['kebabCase', 'snakeCase', 'spaceCase'].includes(toCaseString)) {
            if (toCaseString === 'spaceCase') {
                inputStringCache = inputStringCache.map(word => this.ucfirst(word));
            }

            return inputStringCache.join(caseSplitters[toCaseString]);
        }

        else {
            const finalResultString = inputStringCache.map(word => this.ucfirst(word)).join('');
            if (toCaseString === 'camelCase') {
                return `${finalResultString[0].toLowerCase()}${finalResultString.slice(1)}`;
            }
            return finalResultString;
        }
    }

    /**
     * 5) Create slug from given name using "-" as default delimiter
     */
    createSlug(string, delimiter = '-') {
        return string.split(' ').filter(word => !!word).map(word => word.trim().toLowerCase()).join(delimiter);
    }

    /**
     * 6) Shuffle elements of an array
     */
    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle
        while (currentIndex !== 0) {

            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element
            [ array[currentIndex], array[randomIndex] ] = [ array[randomIndex], array[currentIndex] ];
        }

        return array;
    }

    /**
     * 7) Generate array of numbers from lowerBound (inclusive)
     * to upperBound (inclusive)
     */
    range(upperBound, lowerBound = 0) {
        return [ ...Array(upperBound - lowerBound + 1).keys() ].map(element => element + lowerBound);
    }

    /**
     * 8) Generate random string of "n" characters
     */
    randomString(length) {
        return [
            ...this.range(122, 97),
            ...this.range(90, 65),
            ...this.range(57, 48),
        ].shuffle().splice(0, length).map(ASCII => String.fromCharCode(ASCII)).join('');
    }
}

module.exports = new Proxy(GeneralUtilities, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});
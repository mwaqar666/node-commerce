class Utilities {

}

new Proxy(Utilities, {
    construct() {
        throw new Error('Instance of Utilities Class is not allowed');
    }
});
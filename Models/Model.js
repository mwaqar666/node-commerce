class Model {
    database =

    models = [
        // Register your models here
        'User', 'Category'
    ];
}

module.exports = new Proxy(Model, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});
class CoreDependentUtilities {

    constructor(fs, path) {
        this.fs = fs;
        this.path = path;
    }

    /**
     * 1) Read files from the directory, recursively or
     * non-recursively according to the provided parameter
     */
    readFilesFromDirectory(directory, recursive = false) {
        return this.fs.readdirSync(directory).map(file => {
            const absolutePath = this.path.join(directory, file);
            const isDirectory = this.fs.statSync(absolutePath).isDirectory();
            if (isDirectory) {
                if (recursive) {
                    return this.readFilesFromDirectory(absolutePath, recursive);
                }
            } else {
                return absolutePath;
            }
        }).filter(file => !!file).flat(Infinity);
    }
}

module.exports = new Proxy(CoreDependentUtilities, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});
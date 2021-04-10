class Path {
    baseDirectoryRoots = {
        root: '/',
        core: '/Core',
        view: '/views',
        model: '/Models',
        route: '/routes',
        config: '/config',
        public: '/public',
        controller: '/Controllers',
    };

    constructor(pathPackage) {
        this.path = pathPackage;

        return new Proxy(this, {
            get(target, property) {
                if (property in target) {
                    return target[property];
                }

                if (property.startsWith('get') && property.endsWith('Path')) {
                    const requestedRootDirectoryPath = property.substring(3, property.length - 4).toLowerCase();
                    return function () {
                        return target['getPath'](requestedRootDirectoryPath, ...arguments);
                    };
                }
            }
        });
    }

    sanitizePathString(path) {
        return path.split('/').filter(pathSegment => !!pathSegment);
    }

    constructPath(targetPath) {
        return this.path.join(
            this.path.dirname(require.main.filename), targetPath
        )
    }

    /**
     * Arguments:
     * 1) args: Array =>    This is a two element array. First element provides the root directory name.
     *                      Second element describes the inner path of that provided root directory.
     *
     * Returns: String =>   Complete OS path of requested file
     */
    getPath(...args) {
        return this.constructPath(
            this.path.join(
                this.baseDirectoryRoots[args[0]], ...this.sanitizePathString(args[1] ?? '')
            )
        );
    }
}

module.exports = new Proxy(Path, {
    construct(target, argArray) {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new target(...argArray);
        return this.instance;
    }
});
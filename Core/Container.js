const Path = require('./Path');

class Container {

    pathVariable = '';
    dependencies = {
        core: {
            path: require('path'),
        },
        thirdParty: {
            express: require('express'),
            nunjucks: require('nunjucks'),
            bodyParser: require('body-parser'),
        },
    };

    initializeApplication() {
        this.initiatePathVariable();
    }

    initiatePathVariable() {
        global.pathGenerator = new Path(this.dependencies.core.path);
    }
}

const application = new Container;
application.initializeApplication();
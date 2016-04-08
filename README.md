> NOTE: The Openframe platform is in an early stage. The extension API may change significantly.

# Openframe Extension Example

A boilerplate example of an Openframe extension.

[Openframe](http://openframe.io) is an open source platform for displaying art. Frames running the [Openframe controller](https://github.com/OpenframeProject/Openframe) software can load extensions which add functionality.

## Developing an Extension

A extension is simply a node module which exports an object containing a handful of predefined properties. Every extension must define an `init` function which is called by the frame controller after the extension has been installed, and is passed a reference to an OF object. The OF object provides the extension sandboxed access to the openframe system.

```javascript
...

extension.init = function(OF) {
    // do your extension dance

    // Add a new format, see below
    // OF.addFormat(...)

    // The OF provides access to the current Frame model module. From this object you can access and modify
    // the current frame state directly (frame.state, a serializable js object), persist it to the local disk or
    // save it to the server, etc. Look at frame.js in the Openframe repo for details.
    var frame = OF.getFrame();

    // The OF provides access to the global pubsub system:
    var pubsub = OF.getPubsub();
    pubsub.publish('some/event', {msg: 'something happened!'});
    pubsub.subscribe('frame/' + frame.state.id + '/updated', function() {
        debug('frame has updated!');
    });

    // Finally, extensions are given access to an authenticated REST client (swagger):
    // https://github.com/swagger-api/swagger-js
    // TODO: provide example usage
    var swaggerClient = OF.getRest();
}

...
```

### Extension Types

Though the structure is identical, extensions can be considered to be one of two types: A 'FORMAT' extension or a 'FRAME' extension.

#### FORMAT extensions

A FORMAT extension, not surprisingly, adds a new artwork 'format'. Conceptually, a format can be thought of as the 'media type' of the artwork, e.g. 'an image' or 'a shader'. A format defines how the frame controller should start and stop an artwork of its media type, and installs any dependencies that the media type needs in order to run.

Each artwork specifies exactly one format, and each frame can support any number of formats.

FORMAT extensions should call the addFormat method on the OF object, passing a 'format' object which defines the details of the format.

```javascript
...

// in the extension.init function...

OF.addFormat(
    {
        // what is this format called?
        'name': 'openframe-extensionexample',
        // what is the display name? (not currently used, but maybe a good idea)
        'display_name': 'Openframe Example Extension',
        // does the artwork need to be downloaded in order to run?
        'download': true,
        // how should the artwork be initiated?
        'start_command': 'echo "starting $filepath"',
        // how should the artwork be halted?
        'end_command': 'echo "stopping"'
    }
);

...
```

For an example a FORMAT extension, see [Openframe-glslViewer](https://github.com/OpenframeProject/Openframe-glslViewer).

#### FRAME extensions

A FRAME extension adds functionality to the frame itself. FRAME extensions might be used to interact with the frame hardware, for example allowing for a custom input device to be used via gpio. In other cases, a FRAME extension might add functionality that interacts directly with artworks, for example by sending OSC messages.

```javascript
...
var gpio = require('onoff').Gpio;

// called after install has completed
extension.init = function(OF) {
    // maybe add a button?
    var pubsub = OF.getPubsub(),
        button = new gpio(17, 'in', 'both');

    // when the button changes, publish an event
    button.watch(function(err, state) {
        if (err) debug(err);
        pubsub.publish('/openframe-gpio/17', state);
    });
}

...
```

For an example a FRAME extension, ~~see [Openframe-GPIO](https://github.com/OpenframeProject/Openframe-GPIO)~~ (we need to update this to the most recent extension structure).

### Installing dependencies

If a extension requires NPM packages, they should be included in the package.json `dependencies` (as with any other npm package).

Some extensions may need to install other types of dependencies, or run other types of non-nodejs installation processes. We recommend using [npm scripts](https://docs.npmjs.com/misc/scripts) to execute the install.sh shell script upon install. As a best practice, extensions that modify the system using install.sh should take care of undoing those changes using an uninstall.sh script, which is executed when the npm module is removed. See package.json, install.sh, and uninstall.sh.

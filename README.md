> NOTE: This repo is under development. The contents is likely to change significantly.

# Openframe Plugin Example

A boilerplate example of an Openframe plugin.

[Openframe](http://openframe.io) is an open source platform for displaying art. Frames running the [Frame Controller](https://github.com/OpenframeProject/Openframe-FrameController) software can load plugins which extend functionality.

## Developing a Plugin

> Early prototype. The API will change. A lot.

A plugin is simply a node module which exports an plugin containing a handful of predefined properties.
The plugin will specify a type, either FORMAT or FRAME, and should define a single `init` function. The `init` function is called by the frame controller after the plugin has been installed, and is passed a reference to the frame controller instance, which gives the plugin access to the global event system and other frame functionality.

```javascript
...

plugin.init = function(fc) {
    // do your plugin dance
}

 ...
```

### Plugin Types

Plugins come in one of two types: `FORMAT` or `FRAME`. The type property is required.

#### FORMAT plugins

A FORMAT plugin, not surprisingly, adds a new artwork 'format'. Conceptually, a format can be thought of as the 'media type' of the artwork, e.g. 'an image' or 'a shader'. A format defines how the frame controller should start and stop an artwork of its type, and installs any dependencies that the type needs in order to run. 

Each artwork has exactly one format, and each frame can support any number of formats.

FORMAT plugins should include a 'format' property which defines the details of the format.

```javascript
...

// e.g, the image format plugin

plugin.type = 'FORMAT';

plugin.format = {
    // what is this format called?
    'name': 'image',
    // does the artwork need to be downloaded in order to run?
    'download': true,
    // how should the artwork be initiated?
    'start_command': 'sudo fbi -a --noverbose -T 1 $filepath',
    // how should the artwork be halted?
    'end_command': 'sudo pkill -f fbi',
    // some keywords for grouping/searching formats
    'tags': ['image']
};

 ...
```

For an example a FORMAT plugin, see [Openframe-glslViewer](https://github.com/OpenframeProject/Openframe-glslViewer).

#### FRAME plugins

A FRAME plugin adds functionality to the frame itself. FRAME plugins might be used to interact with the frame hardware, for example allowing for a custom input device to be used via gpio. In other cases, a FRAME plugin might add functionality that interacts directly with artworks, for example by sending OSC messages.

For FRAME plugins, most of the logic will likely go in the `init` method.

```javascript
...

plugin.type = 'FRAME';

// called after install has completed
plugin.init = function(fc) {
    // do your plugin dance
}

 ...
```

For an example a FRAME plugin, see [Openframe-GPIO](https://github.com/OpenframeProject/Openframe-GPIO).

### Installing dependencies

If a plugin requires NPM packages, they should be included in the package.json `dependencies` (as with any other npm package).

Some plugins may need to install other types of dependencies, or run other types of non-nodejs installation processes. We recommend using [npm scripts](https://docs.npmjs.com/misc/scripts) to execute the install.sh shell script upon install. As a best practice, plugins that modify the system using install.sh should take care of undoing those changes using an uninstall.sh script, which is executed when the npm module is uninstalled. See package.json, install.sh, and uninstall.sh.

> NOTE: This repo is under development. The contents is likely to change significantly.

# Openframe Plugin Example

A boilerplate example of an Openframe plugin.

[Openframe](http://openframe.io) is an open source platform for displaying art. Frames running the [Frame Controller](https://github.com/OpenframeProject/Openframe-FrameController) software can load plugins which extend functionality.

## Developing a Plugin

> Early prototype. The API will change. A lot.

A plugin is simply a node module which exports an object containing a handful of predefined properties. Every plugin must define an `init` function which is called by the frame controller after the plugin has been installed, and is passed a reference to an ofPluginApi object. The plugin API object provides the plugin sandboxed access to the frame controller.

```javascript
...

plugin.init = function(ofPluginApi) {
    // do your plugin dance
}

 ...
```

### Plugin Types

Though the structure is identical, plugins can be considered to be one of two types: A 'FORMAT' plugin or a 'FRAME' plugin.

#### FORMAT plugins

A FORMAT plugin, not surprisingly, adds a new artwork 'format'. Conceptually, a format can be thought of as the 'media type' of the artwork, e.g. 'an image' or 'a shader'. A format defines how the frame controller should start and stop an artwork of its media type, and installs any dependencies that the media type needs in order to run.

Each artwork specifies exactly one format, and each frame can support any number of formats.

FORMAT plugins should call the addFormat method on the ofPluginApi, passing a 'format' object which defines the details of the format.

```javascript
...

// in the plugin.init function...

ofPluginApi.addFormat(
    {
        // what is this format called?
        'name': 'openframe-pluginexample',
        // what is the display name?
        'display_name': 'Openframe Example Plugin',
        // does the artwork need to be downloaded in order to run?
        'download': true,
        // how should the artwork be initiated?
        'start_command': 'echo "starting $filepath"',
        // how should the artwork be halted?
        'end_command': 'echo "stopping"',
        // some keywords for grouping/searching formats
        'tags': ['image']
    }
);

...
```

For an example a FORMAT plugin, see [Openframe-glslViewer](https://github.com/OpenframeProject/Openframe-glslViewer).

#### FRAME plugins

A FRAME plugin adds functionality to the frame itself. FRAME plugins might be used to interact with the frame hardware, for example allowing for a custom input device to be used via gpio. In other cases, a FRAME plugin might add functionality that interacts directly with artworks, for example by sending OSC messages.

```javascript
...

// called after install has completed
plugin.init = function(fc) {
    // do your plugin dance
}

 ...
```

For an example a FRAME plugin, see [Openframe-GPIO](https://github.com/OpenframeProject/Openframe-GPIO).

### Installing dependencies

If a plugin requires NPM packages, they should be included in the package.json `dependencies` (as with any other npm package).

Some plugins may need to install other types of dependencies, or run other types of non-nodejs installation processes. We recommend using [npm scripts](https://docs.npmjs.com/misc/scripts) to execute the install.sh shell script upon install. As a best practice, plugins that modify the system using install.sh should take care of undoing those changes using an uninstall.sh script, which is executed when the npm module is removed. See package.json, install.sh, and uninstall.sh.

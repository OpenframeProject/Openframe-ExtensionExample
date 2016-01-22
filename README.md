# Openframe Plugin Example

A boilerplate example of an Openframe plugin.

--

[Openframe](http://openframe.io) is an open source platform for displaying art. Frames running the [Frame Controller](https://github.com/OpenframeProject/Openframe-FrameController) software can load plugins which extend functionality.

### Developing a Plugin

At its core, a plugin is an npm module which exports an object containing a number of predefined properties. The only required property is an `init` function which is called by the frame controller after the plugin has been installed. This `init` function is called with a single argument, a reference to the frame controller instance, which gives the plugin access to the global event system and other frame functionality.

> Note: This is an early prototype. The API may change.

### Installing dependencies

If a plugin requires NPM packages, they should be included in the package.json `dependencies` as with any other node package.

Some plugins may need to install other types of dependencies, or run other types of non-nodejs installation processes. This example uses [npm scripts](https://docs.npmjs.com/misc/scripts) to execute the install.sh shell script upon install. As a best practice, plugins that modify the system using install.sh should take care of undoing those changes using an uninstall.sh script, which is executed when the npm module is uninstalled.



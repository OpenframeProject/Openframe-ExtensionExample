
var plugin = module.exports = {};

// Do we need this? Are there other plugin-y config things?
plugin.config = {
    platform: 'rpi'
};

// TODO: should this be a constant, supplied by a base module?
plugin.type = 'FORMAT';

/**
 * If this plugin is adding a new artwork format, the format definition
 * should be included as a 'format' property on the plugin object.
 *
 * Each format must have a unique name.
 *
 * @type {Object}
 */
plugin.format = {
    'name': 'image',
    'download': true,
    'start_command': 'sudo fbi -a --noverbose -T 1 $filepath',
    'end_command': 'sudo pkill -f fbi',
    'category': 'image'
};

/**
 * Plugin initialization method
 *
 * Called when the plugin (and its dependencies) have been installed.
 *
 * TODO: This will likely get passed a sandboxed API object rather than the full frame controller...
 *
 * @param  {object} fc A reference to the frame controller
 */
plugin.init = function(fc) {
    // do your plugin thing
    console.log('=======>   PluginExample initialized!   <=======');
};

// TODO - Do we want this? Or can we rely on the deps from package.json?
plugin.dependencies = {
  // 'openframe-gpio': 'git+https://git@github.com/OpenframeProject/Openframe-PluginExample.git'
};

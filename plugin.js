var pjson = require('./package.json'),
    plugin = module.exports = {};

// Currently unused... but maybe a good idea?
plugin.config = {
    platform: 'rpi'
};

/**
 * Plugin initialization method.
 *
 * Called when the plugin (and its dependencies) have been installed.
 *
 * @param  {object} ofPluginApi An interface provided to plugins giving limitted access to the frame environment
 */
plugin.init = function(ofPluginApi) {
    // do your plugin thing
    console.log('=======>   Openframe-glslViewer initialized!   <=======');

    /**
     * Plugins can add new artwork formats to the frame.
     *
     * Each format must have a unique name, which should correspond to the
     * name of the npm package.
     */
    ofPluginApi.addFormat(
        {
            // the name should be the same as the package name
            'name': pjson.name,
            // displayed to the user, perhaps?
            'display_name': 'Example Plugin',
            // does this type of artwork need to be downloaded to the frame?
            'download': false,
            // how do start this type of artwork? currently two token replacements, $filepath and $url
            'start_command': 'echo "starting Example Plugin..."',
            // how do we stop this type of artwork?
            'end_command': 'echo "stopping Example Plugin..."',

            'tags': ['example']
        }
    );

    /**
     * Plugins also have access to the global event system
     */
    plugin.pubsub = ofPluginApi.getPubsub();
};

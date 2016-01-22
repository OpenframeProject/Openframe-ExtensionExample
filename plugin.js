
var plugin = module.exports = {};

plugin.formats = [{
  "name": "string",
  "download": true,
  "start_command": "string",
  "end_command": "string",
  "category": "string",
  "id": "string"
}];

plugin.dependencies = {
  // "openframe-gpio": "git+https://git@github.com/OpenframeProject/Openframe-PluginExample.git"
};

// Must return a Promise that resolves on successful intialization
plugin.init = function(fc) {
    // do your plugin thing
    console.log('=======>   PluginExample initialized!   <=======');
};

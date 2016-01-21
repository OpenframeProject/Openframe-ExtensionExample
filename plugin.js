
// export function?
module.exports = function(fc) {
    fc.addFormat()
};

// or export object?


var plugin = module.exports = {};

plugin.install = {
    // "openframe-gpio": "git+https://git@github.com/jmwohl/Openframe-GPIO.git"
};

// Must return a Promise that resolves on successful intialization
plugin.init = function(fc) {

};


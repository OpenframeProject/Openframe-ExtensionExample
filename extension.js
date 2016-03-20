var pjson = require('./package.json'),
    debug = require('debug')('openframe:example'),
    extension = module.exports = {};

/**
 * Extension initialization method.
 *
 * Called when the extension (and its dependencies) have been installed.
 *
 * @param  {object} OF An interface provided to extensions giving limitted access to the frame environment
 */
extension.init = function(OF) {
    // do your extension thing
    debug('=======>   Openframe-ExtensionExample initialized!   <=======');

    /**
     * Extensions can add new artwork formats to the frame.
     *
     * Each format must have a unique name, which should correspond to the
     * name of the npm package.
     */
    OF.addFormat(
        {
            // the name should be the same as the package name
            'name': pjson.name,
            // displayed to the user, perhaps?
            'display_name': 'Example Extension',
            // does this type of artwork need to be downloaded to the frame?
            'download': false,
            // how do start this type of artwork? currently two token replacements, $filepath and $url
            'start_command': 'echo "starting Example Extension..."',
            // how do we stop this type of artwork?
            'end_command': 'echo "stopping Example Extension..."'
        }
    );

    /**
     * Extensions also have access to the global event system
     */
    extension.pubsub = OF.getPubsub();

    /**
     * Extensions also have access to the Swagger REST client (https://github.com/swagger-api/swagger-js)
     * See openframe.io/explorer for API docs, or openframe.io/explorer/swagger.json for the swagger definition
     * which shows the available methods as 'operationId'
     */
    extension.rest = OF.rest();
};

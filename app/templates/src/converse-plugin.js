// A Converse.js plugin

const plugin = {
    // Dependencies are other plugins which might be
    // overridden or relied upon, and therefore need to be loaded before
    // this plugin. They are optional because they're not required to be
    // available (in which case any overrides applicable to them will be ignored).
    //
    // It's possible to make them required by setting
    // "strict_plugin_dependencies" to true,
    // An error will then be raised if the plugin is not found.
    dependencies: [],

    // Converse.js's plugin mechanism will call the initialize
    // method on any plugin (if it exists) as soon as all the plugin
    // have been loaded.
    initialize () {
        // Commonly used utilities and variables can be found under the "env"
        // namespace of the "converse" global.
        //
        // For example:
        //     const { Strophe, $build, $iq, $msg, $pres, _, dayjs, u } = converse.env;

        // Inside this method, you have access to the private
        // `_converse` and `api` objects.
        const { _converse } = this;
        const { api, log } = _converse;
        log.info("The <%= name %> plugin is being initialized");

        // You can specify configuration settings related to this
        // plugin, and also override the default values of existing
        // configuration settings.
        api.settings.update({
             'initialize_message': 'Initializing <%= name %>!'
         });

        // Settings are passed in when `converse.initialize` is called.
        // For example:
        //      converse.initialize({
        //           "initialize_message": "My plugin has been initialized"
        //      });
        //
        // And the configuration setting is then available via API:
        api.alert('info', 'Initalize Message', api.settings.get('initialize_message'));

        // Besides `api.settings.update`, there is also a
        // `api.promises.add` method, which allows you to
        // add promises that your plugin is expected to fulfill.
        //
        // This method takes a string or a list of strings which
        // represent the promise names:
        //
        //      api.promises.add('operationCompleted');
        //
        // Your plugin should then, when appropriate, resolve the
        // promise by calling `api.emit`, which will also
        // emit an event with the same name as the promise.
        // For example:
        //
        //      api.emit('operationCompleted');
        //
        // Other plugins can then either listen for the event
        // `operationCompleted` like so:
        //
        //      api.listen.on('operationCompleted', function { ... });
        //
        // or they can wait for the promise to be fulfilled like so:
        //
        //      api.waitUntil('operationCompleted', function { ... });
    },

    // If you want to override some function or a Model or View defined
    // elsewhere in Converse.js, then you do that under the "overrides"
    // namespace.
    //
    // Note: use overrides with caution. They are so-called "monkey patches"
    // which make the runtime code much harder to reason about and can cause
    // difficult to debug bugs.
    //
    // Usually you can modify existing functionality via configuration
    // settings, the APi or by properly listening and reacting to events and
    // hooks.
    overrides: {
        // For example, the private *_converse* object has a
        // method "onDisconnected". You can override that method as follows:
        onDisconnected () {
            // Overrides the onDisconnected method in converse.js


            // Top-level functions in "overrides" are bound to the
            // inner "_converse" object.
            const _converse = this;
            const { api } = _converse;
            api.alert('info', 'Alert', 'Goodbye!');

            // You can access the original function being overridden
            // via the __super__ attribute.
            // Make sure to pass on the arguments supplied to this
            // function and also to apply the proper "this" object.
            _converse.__super__.onDisconnected.apply(this, arguments);
        },

        // Override the XMPPStatus model's `getFullname` method to return a salutation.
        XMPPStatus: {
            getFullname () {
                // The "_converse" object is available via the __super__ attribute:
                //
                // For example:
                //     const { _converse } = this.__super__;

                // You can call the original overridden method, by
                // accessing it via the __super__ attribute.
                // When calling it, you need to apply the proper
                // context as reference by the "this" variable.
                return `The right honorable ${this.__super__.getFullname.call(this)}`;
            }
        }
    }
}


if (typeof converse === "undefined") {
    window.addEventListener(
        'converse-loaded',
        () => converse.plugins.add("muc-presence-probe", plugin)
    );
} else {
    converse.plugins.add("muc-presence-probe", plugin);
}

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

        // In your plugin, you can also listen for hooks.
        // Hooks allow you to add or modify data and properties used by
        // Converse.
        //
        // For example, the getToolbarButtons hook allows you to add new buttons to the chat toolbar.
        // https://conversejs.org/docs/html/api/-_converse.html#event:getToolbarButtons
         api.listen.on('getToolbarButtons', (_toolbar_el, buttons) => {
            buttons.push(html`
                <button class="my-button" @click=${alert('hello world!')}>
                    <converse-icon class="fa fa-eye" size="1em" color="blue"></converse-icon>
                </button>
            `);
            return buttons;
        });
    }

}


if (typeof converse === "undefined") {
    window.addEventListener(
        'converse-loaded',
        () => converse.plugins.add("my-example-plugin", plugin)
    );
} else {
    converse.plugins.add("my-example-plugin", plugin);
}

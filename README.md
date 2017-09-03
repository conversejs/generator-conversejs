# Converse.js plugin generator

This is a [Yeoman](http://yeoman.io/) generator for creating [Converse.js](https://conversejs.org) plugins.

## Creating a plugin

Firstly, make sure you have Yeoman installed:

    npm install -g yo generator-conversejs

Then, to create a new plugin, run the following:

    $ yo conversejs converse-pluginname

Where `pluginname` should be the name of your plugin.

### Demo your plugin

Once you've generated your plugin, you can navigate into its folder, and then
run `npm install && npm start` to install its dependencies and to start a
webserver.

Then you can open `http://localhost:8080` in your browser to demo your newly
generated plugin.

## Further reading

Converse.js uses [pluggable.js](https://jcbrand.github.io/pluggable.js/) to
provide its plugin architecture.

For more info on how plugins work and how to write them, you can read
Converse.js's [documentation on how to write a plugin](https://conversejs.org/docs/html/plugin_development.html)
as well as the [pluggable.js documentation](https://conversejs.org/docs/html/plugin_development.html).

## Hacking on this generator

To hack and develop `generator-conversejs` or to use the generator directly from the latest source-code,
do the following:

    npm install -g yo  # Make sure yo is installed globally

Check out this repository.

    git clone git@github.com:jcbrand/generator-conversejs.git

Within the checked out repository, issue the following commands:

    $ npm install
    $ npm link

Now you're ready to create your plugin:

    $ yo conversejs converse-pluginname 

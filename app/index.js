const Generator = require('yeoman-generator');

module.exports = class extends Generator {

	constructor (args, opts) {
		super(args, opts);
		this.argument('name', { type: String, required: false });
	}

	prompting () {
        if (!this.options.name) {
            return this.prompt([{
                type    : 'input',
                name    : 'name',
                message : 'Your plugin\'s name',
                default : 'converse-plugin'
            }]).then((answers) => {
                this.options.name = this._slugify(answers.name);
            });
        } else {
			this.options.name = this._slugify(this.options.name);
		}
	}

    writing () {
        this._writingHTML();
        this._writingREADME();
        this._writingPackageJSON();
        this._writingScripts();
    }

    _slugify (text) {
		return text.toString().toLowerCase()
			.replace(/\s+/g, '-')           // Replace spaces with -
			.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			.replace(/\-\-+/g, '-')         // Replace multiple - with single -
			.replace(/^-+/, '')             // Trim - from start of text
			.replace(/-+$/, '');            // Trim - from end of text
    }

    _writingHTML () {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(this.options.name+'/index.html'),
            { title: 'Converse.js Plugin Demo',
              name: this.options.name
            }
        );
    }

	_writingREADME () {
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath(this.options.name+'/README.md'),
            { name: this.options.name }
        );
    }

	_writingPackageJSON () {
		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath(this.options.name+'/package.json'),
            { name: this.options.name }
		);
	}

    _writingScripts () {
		this.fs.copyTpl(
			this.templatePath('src/converse-plugin.js'),
			this.destinationPath(this.options.name+'/src/'+this.options.name+'.js'),
            { name: this.options.name }
		);
    }
};

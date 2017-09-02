var Generator = require('yeoman-generator');

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
                this.options.name = answers.name;
            });
        }
	}

    writing () {
        this._writingHTML();
        this._writingREADME();
        this._writingPackageJSON();
        this._writingScripts();
    }

    _writingHTML () {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(this.options.name+'/index.html'),
            { title: 'Converse.js Plugin Demo' }
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

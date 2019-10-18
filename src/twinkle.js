const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const config = require('./util/config.js');

class Twinkle {
    constructor()  {
        this.client = new Discord.Client();
        this.config = config.DORUPHIE;
        this._globalConfig = config;
        this._loggedIn = false;
        this._plugins = [];

        this.client.on('ready', this.onReady.bind(this));
        this.client.on('error', this.onError.bind(this));
    }

    loadPlugin(Plugin) {
        if (this._loggedIn) throw new Error('Plugins must be loaded before calling login()');
        if (this._plugins.includes(Plugin)) return;

        this._plugins.push(Plugin);

        if (Plugin.deps) {
            Plugin.deps.forEach(this.loadPlugin.bind(this));
        }

        const plugin = new Plugin(this);
        plugin.load();
    }

    loadPluginDir(dir) {
        fs.readdirSync(dir).forEach(file => {
            const p = path.join(dir, file);
            const Plugin = require(p);
            console.log(Plugin);
            this.loadPlugin(Plugin);
        });
    }

    onReady() {
        console.log('ready');
    }

    onError(e) {
        console.log('error', e);
    }

    login(token) {
        if (this._loggedIn) throw new Error('Cannot call login() twice');

        this._loggedIn = true;
        this.client.login(token);
    }
}

module.exports = Twinkle;
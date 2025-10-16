export const locale = {
    files: {
        zedIgnore: "files.zedIgnore",
    },
    
    init: {
        id: "init.id",
	    name: "init.name",
	    authors: "init.authors",
	    description: "init.description",
	    version: "init.version",
    	folders: "init.folders",
        build: "init.build",
        idExists: "init.idExists",
        noBuild: "init.noBuild"
    },

    build: {
        success: "build.success",
    },

    about: {
        description: "about.description",
        maintained: "about.maintained",
        release: "about.release",
        design: "about.design",
    },

    lang: {
        language: "lang.language",
    },

    steam: {
        libs: "steam.libs",
        path: "steam.path",
    },

    errors: {
        notRepo: "errors.notRepo",
        notLang: "errors.notLang"
    },

    commands: {
        about: {
            description: "commands.about.description"
        },
        build: {
            description: "commands.build.description",
            options: {
                stable: "commands.build.options.stable",
                experimental: "commands.build.options.experimental"
            }
        },
        config: {
            description: "commands.config.description"
        },
        init: {
            description: "commands.init.description",
            options: {
                overwrite: "commands.init.options.overwrite",
                media: "commands.init.options.media"
            }
        },
        lang: {
            description: "commands.lang.description"
        },
        steam: {
            description: "commands.steam.description",
            options: {
                path: "commands.steam.options.path",
                libs: "commands.steam.options.libs"
            }
        },
        watch: {
            description: "commands.watch.description"
        }
    },

    watcher: {
        error: "watcher.error",
        event: {
            fileAdded:   "watcher.event.fileAdded",
            fileChanged: "watcher.event.fileChanged",
            fileRemoved: "watcher.event.fileRemoved",
            dirAdded:    "watcher.event.dirAdded",
            dirRemoved:  "watcher.event.dirRemoved",
        }
    }
};
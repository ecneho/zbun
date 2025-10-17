# Zbun 🍞
<img src="https://img.shields.io/npm/l/zbundler.svg"> <img src="https://img.shields.io/npm/v/zbundler.svg"> <img src="https://img.shields.io/npm/dm/zbundler.svg">

```
      _                     _ _
  ___| |__  _   _ _ __   __| | | ___ _ __ 
 |_  / '_ \| | | | '_ \ / _' | |/ _ \ '__|
  / /| |_) | |_| | | | | (_| | |  __/ |   
 /___|_.__/ \__,_|_| |_|\__,_|_|\___|_|   

```

ZBundler is a CLI tool for creating and bundling Project Zomboid mods.\
**zbun** is designed with a clear dev/release separation in mind.

Developed and maintained by _Simon 'Ecneho'_ under the [MIT License](https://github.com/ecneho/zbun?tab=MIT-1-ov-file).

# Features
- Initialize new Project Zomboid mod projects.\
```Set up a standalone project structure, separate from the default Zomboid/Workshop folder.```

- Configure and manage project metadata.\
```Easily update workshop.txt```

- Build and package mods for production.\
```Bundle ./src and ./workshop into a game-ready format compatible with Project Zomboid.```

- Custom filtering support (.zedignore)\
```Control which files and folders are excluded from the final build.```

- Link mods directly to the game.\
```Allow projects to be recognized as mods without manual relocation.```

- Selective hot-reloading.\
```Automatically reflects directory and file changes. When combined with linking, simulates classic 'in-folder' modding experience.```

- Steam directory detection.\
```More automation by detecting Steam install and library paths.```

- Multi-language CLI support (yet to be extended).\
```Full internationalization support.```

- Minimal setup required.\
```Run alongside Node.js binaries. No global installation required.```

- Cross-platform support.\
```Compatible with both Windows and Linux environments.```

- Interactive CLI menus.\
```Intuitive prompts for routine tasks.```

# Installation
For [Node.js](https://nodejs.org) installation either refer to the [official download page](https://nodejs.org/en/download), or download [prebuilt binary](https://nodejs.org/en/download/archive/v22.16.0).
- A proper Node.js installation is recommended for easier updates and overall convenience.
- Using prebuilt binaries gives the same results but avoids creating additional (probably unnecessary) system files - ideal if Node.js is being used primarily for running ```zbundler```.

### If Node.js is installed globally
Run: ```npm i -g zbundler```.\
Then run using either ```npx```:\
```npx zbun```\
or globally:\
```zbun```

### If Node.js is downloaded as a binary
Download zbundler.js from the [Stable releases](https://github.com/ecneho/zbun/releases/tag/Stable).\
Place the bundler file in the same directory as the Node.js binary, or reference it via a relative path.

Run on Windows: ```./node.exe zbundler.js [command]```\
Run on Linux: ```./node zbundler.js [command]```

# Available Commands
| Command                |Description        
| ---------------------- | ----------------------------------------------------------------
| `init [options]`       | Initialize a new Zed project in the current working directory.                                       
| `build [options]`      | Bundle the project into a production-ready mod compatible with Project Zomboid.                      
| `link`                 | Create a symbolic link from the `./build` folder to `Zomboid/Workshop`, making the mod game-visible. 
| `watch`                | Enable selective hot-reloading; automatically apply changes to the build folder in real-time.        
| `config <key> [value]` | Modify configuration values in `project.json`.      
| `steam [options]`      | Display the system paths of Steam and its libraries.         
| `lang [lang]`          | Set the CLI language using a language code.        
| `about`                | Display brief information about the bundler.                                                         
| `help [command]`       | Show detailed information about a specific command.                                                  


# Quick Start
1. Create zed project: ```zbun init```.
2. _(optional) Modify ```.zedignore``` to avoid bundling specific files or directories._
3. _(optional) Change mod ```workshop.txt``` info: ```zbun config <key> [value]```._
4. Bundle game-ready mod: ```zbun build```.
5. Link ```./build``` to the game folder via symlinking: ```zbun link```.
6. Enable temporary hot-reloading to avoid constant ```build```-ing: ```zbun watch```.
7. Develop!

# Commands
## ```⚙️ init```
Launches an interactive menu for the developer.\
Afterwards, initializes a new modding project directory, further referred to as ```zed project``` for convenience.

### Usage
```> zbun init [--flags]```

### Flags
|  Short Flag | Long Flag   | Description                                                     |
|-------------|-------------|-----------------------------------------------------------------|
| -o          | --overwrite | Overwrites zed project if the same id is specified.             |
| -m          | --media     | Shows all available media directories (not recursively) when including project folders.  |

### Options
none

### Example
```
$ zbun init
√ Mod id: example
√ Mod name: Example Mod
√ Mod authors: Ecneho
√ Mod description: Workshop WIP
√ Mod version: 0.0.1
? Include folders:
 ( ) clothing/clothingitems
 ( ) lua
 (*) lua/client
>(*) lua/server
 ( ) lua/shared
 (*) lua/shared/Translate
 ( ) scripts
? Target build:
>(*) b41
 ( ) b42
 ```
 ```
 $ zbun init
√ Mod id: example
√ Mod name: Example Mod
√ Mod authors: Ecneho
√ Mod description: Workshop WIP
√ Mod version: 0.0.1
√ Include folders: lua/client, lua/server, lua/shared/Translate
√ Target build: b41
```
```
A:.
└───example
    ├───src
    │   └───41
    │       └───media
    │           └───lua
    │               ├───client
    │               ├───server
    │               └───shared
    │                   └───Translate
    └───workshop
```
## ```⚙️ build```
Bundles the ```./src``` and ```./workshop``` folders into a publish-ready Project Zomboid–compatible mod.\
If the project has been linked beforehand, the resulting mod should be visible in-game and does not require manually moving folders to the ```Zomboid/Workshop``` directory.\
If no flags are specified, the mod is bundled for both ```stable``` and ```experimental``` builds.

### Usage
```> zbun build [--flags]```

### Flags
|  Short Flag | Long Flag   | Description                                                     |
|-------------|-------------|-----------------------------------------------------------------|
| -s          | --stable      | Bundles zed project for B41.             |
| -e          | --experimental      | Bundles zed project for B42.  |

### Options
none

### Example
```
$ zbun build -s
success: release packaged: A:\...\example\build
```
## ```⚙️ link``` 
Creates a symlink in the ```Zomboid/Workshop``` folder pointing to the current mod’s ```build``` directory. The link is named after the mod ID.\
Once linked, the mod becomes visible to the game, and the developer no longer needs to manually move the build folder.\
If the ```build``` folder is moved manually, it is recommended to delete the existing symbolic link and rerun the command.

### Usage
```> zbun link```

### Flags
none

### Options
none

### Example
```
$ zbun link
info: link created: C:\...\Zomboid\Workshop\example -> A:\...\example\build
```
## ```⚙️ watch``` 
Enables temporary selective hot-reloading. When active, rebuilds zed project and any changes to files or directories are automatically applied to the build folder.\
When used together with the ```link``` command, it effectively mimics traditional game modding and fulfills the primary purpose of the bundler.\
To stop watching, provide any input to the console.\
⚠️ If the console is closed by other means, hanging processes and directory locks may occur, requiring manual process termination. ⚠️

### Usage
```> zbun watch```

### Flags
none

### Options
none

### Example
```
$ zbun watch
info: re-building project
 dir added: src\41
 dir added: workshop
 dir added: src\41\media
 dir added: src\41\media\lua
 dir added: src\41\media\lua\client
 dir added: src\41\media\lua\server
 dir added: src\41\media\lua\shared
 dir added: src\41\media\lua\shared\Translate
file added: workshop\description.txt
file added: src\41\poster.png
file added: workshop\preview.png
file added: src\41\icon.png
file added: src\41\media\sandbox-options.txt
```
On 'Enter' key pressed:
```
info: watchers stopped
```
## ```⚙️ config``` 
Modifies configuration values in project.json.\
These values are later used to generate the mod's ```workshop.txt```.

### Usage
```> zbun config <key> [value]```

### Flags
none

### Options
|  Option |     Description                                                     |
|---------|-----------------------------------------------------------------|
| key      | The name of an existing key in ```project.json``` to be modified. |
| value      | The new value to assign to the specified key.            |

### Example
```
$ zbun config description "new mod description"
modified: "description" > "new mod description"
```
## ```⚙️ steam```
Displays the system path of Steam itself or its library. These paths are used during linking and when fetching the media folder.\
This command is intended for debugging purposes, specifically when there are issues with ```zbundler``` locating the Steam directory.\
If no flags are specified, displays both paths.

### Usage
```> zbun steam [--flags]```

### Flags
|  Short Flag | Long Flag   | Description                                                     |
|-------------|-------------|-----------------------------------------------------------------|
| -p          | --path      | Displays Steam system path.             |
| -l          | --libs      | Displays Steam library path.  |

### Options
none

### Example
```
$ zbun steam
Steam Libraries: A:\\Programs\\Steam
Steam Path: A:\Programs\Steam
```
## ```⚙️ lang```
Changes the CLI language.\
If no options are specified, the developer is prompted to choose from a list of available languages.

### Usage
```> zbun lang [lang]```

### Flags
none

### Options
|  Option |     Description                                                     |
|---------|-----------------------------------------------------------------|
| lang      | Language code in ```ISO 639-1``` standard (```xx```).             |

### Supported languages
| Code | Language |
|------|----------|
| ```en```   | English  |

### Example
```
$ zbun lang en
```
or
```
$ zbun lang
? CLI Language:
> en
```
```
$ zbun lang
√ CLI Language: en
```
## ```⚙️ about``` 
Displays brief information about the bundler.

### Usage
```> zbun about```

### Flags
none

### Options
none

### Example
```
$ zbun about

          _                     _ _
      ___| |__  _   _ _ __   __| | | ___ _ __
     |_  / '_ \| | | | '_ \ / _' | |/ _ \ '__|
      / /| |_) | |_| | | | | (_| | |  __/ |
     /___|_.__/ \__,_|_| |_|\__,_|_|\___|_|

A CLI tool for creating and bundling Project Zomboid mods.
zbun is designed with a clear dev/release separation in mind

Developed and maintained by Simon 'Ecneho'
Release page is found at https://github.com/ecneho/zbun
```
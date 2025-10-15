# Zbun 🍞
```
      _                     _ _
  ___| |__  _   _ _ __   __| | | ___ _ __ 
 |_  / '_ \| | | | '_ \ / _` | |/ _ \ '__|
  / /| |_) | |_| | | | | (_| | |  __/ |   
 /___|_.__/ \__,_|_| |_|\__,_|_|\___|_|   

```

ZBundler is a CLI tool for creating and bundling Project Zomboid mods.\
**zbun** is designed with a clear dev/release separation in mind.

Developed and maintained by _Simon 'Ecneho'_.

## Features
- Initialize new PZ mod projects (separate from the Workshop folder).
- Configure and manage project metadata.
- Build and package your mods for production.
- Custom .zedignore to control build contents.

## Installation
```npm -i zbundler```

## Usage
### Use directly
```npx zbundler```\
```npx zbun```

### If installed globally
```zbun```

### Available Commands
```init [options]```        initialize a new zed project in the working directory\
```steam [options]```       fetches referenced Steam directory\
```config <key> [value]```  modifies zed project config\
```build [options]```       package project for production release\
```about```                 more info about zbun\
```lang [lang]```           set the CLI language\
```help [command]```        display help for command

## Examples
Initialize Zed repository:
```
$ zbun init
√ Mod id: zed-mod
√ Mod name: Zed Mod
√ Mod authors: Ecneho
√ Mod description: WIP
√ Mod version: 1.0.0
? Include folders:
 (*) lua
 (*) lua/client
 (*) lua/server
>(*) lua/shared
 ( ) lua/shared/Translate
 ( ) scripts
 ( ) textures
```

Modify mod metadata:
```
$ zbun config description "new description"
modified: "description" > "new description"
```

Build for experimental (B42)
```
$ zbun build --experimental
success: release packaged: A:\Projects\Zomboid\tools\mods\a\build
```
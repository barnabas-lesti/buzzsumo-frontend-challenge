# BuzzSumo Frontend Challenge

Example Vue 3 application for the BuzzSumo team, based on [these requirements](https://gist.github.com/raymondmuller/1092b8c9eec53d931a86961f7e635465).

## Project Setup

### Install dependencies
```sh
npm install
```

### Compile and Hot-Reload for Development
```sh
npm run dev
```



### Run Unit Tests
```sh
npm run test:unit
npm run test:unit:coverage 
```

### Lint
```sh
npm run lint
```

### Type-Check, Compile and Minify for Production
```sh
npm run build
```

### Start a production server (after the above)
```sh
npm run prod
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

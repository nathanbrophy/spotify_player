# mavboard

**Iteration 1**

1. Jade/Kent - make a simple mopidy/spotify call
2. Jordan/Anthony/Natnael - pull weather and/or bus data and display that information on a page


## Installation

1. Clone project from GitHub 

```sh
git clone git@github.com:mavericksoftwareconsulting/mavboard.git
```

2. Enter the new mavboard directory

```sh
cd mavboard/
```

3. Install all dependencies

```sh
npm install
```


## Running mavboard

```sh
npm start
```

Mavboard will run on http://localhost:3000

## Developing code

### Compiling

Core Javascript logic lives in the `src/` directory, and this is where you should write all Javascript. However, to actually run the code, you need to compile it using [Babel](https://babeljs.io). The easiest way to do this is with the built-in script:

```sh
npm run compile
```

### Using Flow

Mavboard code is capable of running [Flow](https://flow.org), a static type-checker which makes Javascript strongly-typed. Flow will only run on pages which begin with the opt-in comment:

```js
// @flow
```

Once it's enabled, use the built-in script to check all Flow-enabled code:

```sh
npm run flow
```

This script will report any type errors and warnings for you to fix. 

*_remember to compile with `npm run compile` in order to see your changes when mavboard is running_*

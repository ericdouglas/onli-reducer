# onli-reducer

[![Codeship Status for ericdouglas/onli-reducer](https://app.codeship.com/projects/c69cbcf0-ae10-0137-49b6-5aae0d4b4bf9/status?branch=master)](https://app.codeship.com/projects/362530)
[![Coverage Status](https://coveralls.io/repos/github/ericdouglas/onli-reducer/badge.svg?branch=master)](https://coveralls.io/github/ericdouglas/onli-reducer?branch=master)
[![npm version](https://badge.fury.io/js/onli-reducer.svg)](https://badge.fury.io/js/onli-reducer)

[![NPM](https://nodei.co/npm/onli-reducer.png)](https://nodei.co/npm/onli-reducer/)

**onli-reducer** is a micro-library that helps you to write applications using redux/useReducer without boilerplate.

> Works with whatever state management that gives you a `dispatch` method and expects you to call such method passing an object to it with a `type` property.

## Table of Contents

- [onli-reducer](#onli-reducer)
  - [Table of Contents](#table-of-contents)
  - [Benefits over traditional redux/useReducer usage (with `switch`)](#benefits-over-traditional-reduxusereducer-usage-with-switch)
  - [Install](#install)
  - [Basic Concepts](#basic-concepts)
    - [Reducer Solution](#reducer-solution)
    - [Dispatch Solution](#dispatch-solution)
  - [Usage / Examples](#usage--examples)
    - [Using onli-reducer with React Hooks + Context](#using-onli-reducer-with-react-hooks--context)
    - [Using onli-reducer with Redux](#using-onli-reducer-with-redux)
  - [Convetions](#convetions)
  - [API](#api)
    - [`onli(actions)`](#onliactions)
    - [`onliSend(dispatch, types)`](#onlisenddispatch-types)
    - [`onliReducer(actions)`](#onlireduceractions)
    - [`onliTypes(actions)`](#onlitypesactions)
  - [License](#license)

## Benefits over traditional redux/useReducer usage (with `switch`)

- No boilerplate code.
- _Literally_ one line reducer (no need to use `switch` statement).
- Direct call to actions without instructions about their `type`.
- Support for asynchronous calls (dispatch/send actions from async functions).
- No need to manually write your types.

## Install

```sh
npm install --save onli-reducer
```

## Basic Concepts

**onli-reducer** expose 4 methods in order to help you eliminate boilerplate code from your reducers, dispatch calls and application in general.

> Although we expose 4 methods, you will normally just use the `onli` and `onliSend` method.

### Reducer Solution

Instead of create a reducer function with a evergrowing `switch` statement inside of it, you just need to:

1. Declare your actions as plain JavaScript functions;
2. Attach such functions to an `actions` object;
3. Pass the `actions` object to `onli()` helper.

The `onli` helper method returns an array with 2 elements: a reducer function and an array of strings (types), that is generated based on your actions' names.

**Example**:

```js
import onli from "onli-reducer"

const increment = state => state + 1
const decrement = state => state - 1

const actions = { increment, decrement }
const [countReducer, types] = onli(actions)

export { countReducer, types }
```

### Dispatch Solution

Istead of manually set type in _every_ dispatch call, you can just:

1. Pass your `dispatch` method (from Redux or useReducer) and `types` array (from `onli`) for `onliSend`.
2. Call your actions directly.

---

**Important**:

All your actions will receive in the `action` object dispatched at least two properties: `type` and `send`. You can pass any additional payload to your actions.

The `type` property is a string to let your reducer know which function it has to invoke.

The `send` property is an object that holds all other public actions so you can pass it to async functions in order to update your state after async calls.

You can see how it is used in a real app [here](#using-onli-reducer-with-react-hooks--context).

---

**Example**:

```jsx
import { onliSend } from "onli-reducer"
import { countReducer, types } from "./count.reducer"

// ...

const send = onliSend(dispatch, types)
const { increment, decrement } = send

// ...

<Counter
  value={count}
  onIncrement={() => increment()}
  onDecrement={() => decrement()}
/>
```

## Usage / Examples

### Using onli-reducer with React Hooks + Context

We created a full example with asynchronous calls so you can have a glimpse of how **onli-reducer** would perform in real-world applications.

In such example app you will see:

- data fetching
- loading state transition
- React hooks `useState`, `useReducer` and `useContext`
- React Context API
- asynchronous actions called from your reducer
- more...

See the [live demo here](https://ericdouglas.github.io/onli-reducer-example/) or the [source code here](https://github.com/ericdouglas/onli-reducer-example).

### Using onli-reducer with Redux

To show a comparison between the traditional usage of Redux and the new approach using **onli-reducer**, let's rebuild the _Counter_ app from [Redux docs](https://redux.js.org/introduction/examples#counter).

`index.js` with Redux:

```js
import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import Counter from "./components/Counter"
import counter from "./reducers"

const store = createStore(counter)
const rootEl = document.getElementById("root")

const render = () =>
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: "INCREMENT" })}
      onDecrement={() => store.dispatch({ type: "DECREMENT" })}
    />,
    rootEl
  )

render()
store.subscribe(render)
```

`index.js` with Redux + **onli-reducer**:

```js
import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import { onliSend } from "onli-reducer"

import Counter from "./components/Counter"

import { countReducer, types } from "./reducers"

const store = createStore(countReducer, 0)
const send = onliSend(store.dispatch, types)
const { increment, decrement } = send

const rootEl = document.getElementById("root")

const render = () =>
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => increment()}
      onDecrement={() => decrement()}
    />,
    rootEl
  )

render()
store.subscribe(render)
```

`reducers/index.js` with Redux:

```js
export default (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
    default:
      return state
  }
}
```

`reducers/index.js` with Redux + **onli-reducer**:

```js
import onli from "onli-reducer"

const increment = state => state + 1
const decrement = state => state - 1

const actions = { increment, decrement }
const [countReducer, types] = onli(actions)

export { countReducer, types }
```

You can see/edit the example above here:

[![Edit counter](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/counter-c6vy4?fontsize=14)

> **OBS**: although in this simple example it can not be so evident the benefits of using onli-reducer, for real-world applications the amount of boilerplate code that onli-reducer helps you to not type is considerable.

## Convetions

Inside `your.reducer.js` file, attach your synchronous functions to the actions object and name your asynchronous functions with an underscore, so you now they are both private and async.

These async functions will be triggered from your sync ones, and after finish their job such async functions will dispatch

## API

### `onli(actions)`

The `onli` method expects an object that contains your public/synchrounous actions. It returns an array with two elements: a reducer (`function`) and an array with strings that represents your types (`[string]`)

```js
import onli from "onli-reducer"

const increment = state => state + 1
const decrement = state => state - 1

const actions = { increment, decrement }

const [countReducer, types] = onli(actions)

export { countReducer, types }
```

### `onliSend(dispatch, types)`

The `onliSend` method receives a `dispatch` function and a `types` array of strings.

It will return an object with methods attached to it. You will use these methods to dispatch actions in order to update your reducer.

```js
///// Without onli-reducer
dispatch({ type: "increment" })
dispatch({ type: "increment", step: 5 })

///// With onli-reducer
increment()
increment({ step: 5 })
```

`onliSend` also adds to your `action` payload an object called `send`, that holds itself, the object returned from calling `onliSend(dispatch, types)` that have access to all your actions.

This is very useful because with such object you can pass it for async functions so them can dispatch actions to update your state after finish their async tasks.

```js
// async action from your reducer
const _getPokemon = async ({ name, send }) => {
  const { showLoading, hideLoading, updateStore } = send // <- access to your sync methods

  showLoading()

  try {
    const { data } = await axios.get(`${URL}${name}`)
    updateStore({ pokemon: data }) // <- update your state after success
    hideLoading()
  } catch (error) {
    updateStore({ warning: "Ops... Pokémon not found" }) // <- update your state after failure
    hideLoading()
  }
}
```

### `onliReducer(actions)`

Receives an `actions` object and return a reducer.

### `onliTypes(actions)`

Receives an `actions` object and return an array with strings (types).

## License

[MIT License](https://ericdouglas.mit-license.org/) © Eric Douglas

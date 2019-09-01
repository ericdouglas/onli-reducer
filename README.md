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
  - [Usage](#usage)
  - [Examples](#examples)
    - [Using onli-reducer with React Hooks + Context](#using-onli-reducer-with-react-hooks--context)
    - [Using onli-reducer with Redux](#using-onli-reducer-with-redux)

## Benefits over traditional redux/useReducer usage (with `switch`)

- No boilerplate code.
- _Literaly_ one line reducer (no need to use `switch` statement).
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

## Usage

## Examples

### Using onli-reducer with React Hooks + Context

We created a full example with asynchronous calls so you can have a glimpse of how **onli-reducer** would perform for real-world applications.

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

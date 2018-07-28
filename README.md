# asynciterify

Turn an event stream into an async iterable

## Installation

`yarn add @mattkrick/asynciterify`

WARNING! This is _not_ transpiled to ES5 because the performance penalty is so high.
If you need to target old browsers, include it in your webpack/rollup build!

## What is it

A wrapper that turns event streams into async iterables

## Why?

Because callbacks are ugly.
Seriously, that's the only reason.

## Usage

```js
// from this
document.addEventListener('click', (event) => console.log('click')

// to this
import asynciterify from '@mattkrick/asynciterify'

const clicks = asynciterify(document, 'click')
for await (const event of clicks) {
  console.log('click')
}
```

## API
```js
const asyncIterable = asynciterify(source, event, options)
```

- `source`: any source like a DOM element, websocket, event emitter, etc.
- `event`: the event name that you want to listen to, e.g. 'click', 'message', 'data'
- `options`:
  - `isEmitter`: defaults to `false`. 
  If `true`, it uses `on/off` methods instead of `addEventListener, removeEventListener` (useful for EventEmitters)

## License

MIT

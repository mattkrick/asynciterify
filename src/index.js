const asynciterify = (emitter, event, options = {}) => {
  const onMethod = options.isEmitter ? 'on' : 'addEventListener'
  const offMethod = options.isEmitter ? 'off' : 'removeEventListener'
  const pullQueue = []
  const pushQueue = []
  let done = false

  const pushValue = async (args) => {
    if (pullQueue.length !== 0) {
      const resolver = pullQueue.shift()
      resolver(...args)
    } else {
      pushQueue.push(args)
    }
  }

  const pullValue = () => {
    return new Promise((resolve) => {
      if (pushQueue.length !== 0) {
        const args = pushQueue.shift()
        resolve(...args)
      } else {
        pullQueue.push(resolve)
      }
    })
  }

  const handler = (...args) => {
    pushValue(args)
  }

  emitter[onMethod](event, handler)
  return {
    [Symbol.asyncIterator]() {
      return this
    },
    next: () => ({
      done,
      value: done ? undefined : pullValue()
    }),
    return: () => {
      done = true
      emitter[offMethod](event, handler)
      return {done}
    },
    throw: (error) => {
      done = true
      return {
        done,
        value: Promise.reject(error)
      }
    }
  }
}

export default asynciterify

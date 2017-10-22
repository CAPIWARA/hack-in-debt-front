const plugin = (store) => {
  const original = store.dispatch

  store.handlers = {}

  store.dispatch = (...params) => {
    const [ type ] = params
    const { onSuccess, onFailure } = {
      ...store.handlers[type] || {},
      ...store.handlers || {}
    }

    const handleSuccess = (result) => Promise.resolve(
      onSuccess
        ? onSuccess(result, ...params)
        : result
    )

    const handleFailure = (error) => Promise.resolve(
      onFailure
        ? onFailure(error, ...params)
        : error
    )

    return Promise.resolve(original.apply(store, params))
      .then(handleSuccess)
      .catch(handleFailure)
  }
}

export default plugin

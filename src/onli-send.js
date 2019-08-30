export default (dispatch, types) => {
  const send = types.reduce((acc, next) => ({ ...acc, [next]: "" }), {})
  const newDispatch = type => action => dispatch({ type, send, ...action })

  types.forEach(type => (send[type] = newDispatch(type)))

  return send
}

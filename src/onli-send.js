export default (dispatch, types) => {
  const newDispatch = type => action => dispatch({ type, ...action })
  const send = types.reduce(
    (acc, next) => ({ ...acc, [next]: newDispatch(next) }),
    {}
  )

  return send
}

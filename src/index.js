import onliReducer from './onli-reducer'
import onliTypes from './onli-types'
import onliSend from './onli-send'

/**
 * Helper method to return the reducer and types at once
 *
 * @param {Object} actions object with all actions (methods) attached to it
 * @returns {[() => void, Object]} returns the reducer function and object with generated types
 */
const onli = actions => [onliReducer(actions), onliTypes(actions)]

export { onliReducer, onliTypes, onliSend }
export default onli

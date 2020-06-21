import onliReducer from './onli-reducer'
import onliTypes from './onli-types'
import onliSend from './onli-send'

const onli = actions => [onliReducer(actions), onliTypes(actions)]

export { onliReducer, onliTypes, onliSend }
export default onli

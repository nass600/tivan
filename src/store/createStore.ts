import { Store, applyMiddleware } from 'webext-redux'
import thunkMiddleware from 'redux-thunk'

const proxyStore = new Store({ portName: 'tivan' })
const middleware = [thunkMiddleware]

export default applyMiddleware(proxyStore, ...middleware)

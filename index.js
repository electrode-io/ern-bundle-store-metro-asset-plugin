const ipc = require('node-ipc')
const uuidv4 = require('uuid/v4');
const debug = require('debug')(`ern:worker:${uuidv4()}`)

const IPC_SOCKET_ID = 'ern-bundle-store'

ipc.config.logger = debug
ipc.config.stopRetrying = true
let isConnected = false
let timer

async function connect() {
  return new Promise((resolve, reject) => {
    ipc.connectTo(IPC_SOCKET_ID, () => {
      ipc.of[IPC_SOCKET_ID].on('error', (err) => {        
        reject()
      })
      ipc.of[IPC_SOCKET_ID].on('connect', () => {        
        resolve()
      })
      ipc.of[IPC_SOCKET_ID].on('disconnect', () => {
        isConnected = false
      })
    })
  })
}

async function transformer(assetData) {
  try {
    if (!isConnected) {    
      await connect()
      isConnected = true     
    } 
  
    // IPC connected clients will block the Node process
    // to terminate. Because we don't want Metro bundler
    // to stall forever, we disconnect client after 10s
    // of being unused. The client will reconnect if needed
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      ipc.disconnect(IPC_SOCKET_ID)
      timer = null
    }, 10000)
    
    timeOfLastAssetTransformed = Date.now()
  
    ipc.of[IPC_SOCKET_ID].emit(
      'assets', 
      JSON.stringify(assetData)
    )
  } catch (e) {
    // swallow
  } finally {
    return assetData
  }      
}

module.exports = transformer;
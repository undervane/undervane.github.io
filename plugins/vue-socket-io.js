import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

const socket = io(process.env.WSS_HOST, {
  autoConnect: false,
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 10
})

Vue.use(VueSocketIOExt, socket)

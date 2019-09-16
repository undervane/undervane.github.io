import Vue from 'vue';
import App from './App.vue';
import store from './addons/store';
import Icon from 'vue-awesome/components/Icon.vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.config.productionTip = false;

import '@/assets/css/tailwind.css';

import '@/assets/scss/global.scss';

Vue.component('v-icon', Icon);

const socket = io(process.env.VUE_APP_WSS_HOST, {
	autoConnect: false,
	transports: ['websocket', 'polling'],
	reconnectionAttempts: 10
});

Vue.use(VueSocketIOExt, socket);

resetHeightViewport();

new Vue({
	store,
	render: (h) => h(App),
}).$mount('#app');


function resetHeightViewport() {
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	const vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

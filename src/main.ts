import Vue from 'vue';
import App from './App.vue';
import store from './addons/store';
import Icon from 'vue-awesome/components/Icon.vue';

Vue.config.productionTip = false;

import '@/assets/css/tailwind.css';

import '@/assets/scss/global.scss';

Vue.component('v-icon', Icon);

new Vue({
	store,
	render: (h) => h(App),
}).$mount('#app');

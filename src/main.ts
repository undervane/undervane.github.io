import Vue from 'vue';
import App from './App.vue';
import store from './addons/store';
import Icon from 'vue-awesome';

Vue.config.productionTip = false;

import '@/assets/css/tailwind.css';

import '@/assets/scss/global.scss';

Vue.component('v-icon', Icon);
import 'vue-awesome/icons';

new Vue({
	store,
	render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import Vuex from 'vuex';
import { LightModule } from './light';
import { ChatModule } from './chat';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		light: LightModule,
		chat: ChatModule,
	}
});

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { sleep } from "@/utils";

@Module({ namespaced: true })
export class ChatModule extends VuexModule {

	open = false;
	firstLoad = true;
	disabled = true;
	hasDisconnected = false;
	placeholder = 'Write your name';
	messages = [] as ChatMessage[];

	@Action
	toggleChat() {
		this.open ?
			this.context.dispatch('closeChat') :
			this.context.dispatch('openChat');

	}

	@Action
	openChat() {

		this.context.commit('SET_OPEN', true);

		if (this.firstLoad) {
			this.context.commit('SET_FIRST_LOAD', false);
			this.context.dispatch('addInitialMessages');
		}
	}

	@Action
	closeChat() {
		this.context.commit('SET_OPEN', false);
	}

	@Action
	async reset() {
		this.context.commit('RESET');
		await sleep(600);
		this.context.dispatch('openChat');
	}

	@Action
	addMessage(message: ChatMessage) {
		this.context.commit('ADD_MESSAGE', message);
	}

	@Action
	setDisabled(status: boolean) {
		this.context.commit('SET_DISABLED', status);
	}

	@Action
	disconnected() {
		this.context.dispatch('setDisabled', true);
		this.context.dispatch('setPlaceholder', 'Not connected');
		this.context.commit('SET_HAS_DISCONNECTED', true);
	}

	@Action
	setPlaceholder(text: string) {
		this.context.commit('SET_PLACEHOLDER', text);
	}

	@Action
	async addInitialMessages() {
		const welcomeMessage = {
			text: "Hey! Thanks for coming over here, what's your name?",
			fromUser: false
		};

		const emoji = {
			text: '😊',
			fromUser: false
		};

		await sleep(500);
		this.context.dispatch('addMessage', welcomeMessage);

		await sleep(600);
		this.context.dispatch('addMessage', emoji);

		this.context.dispatch('setDisabled', false);
	}

	@Mutation
	SET_FIRST_LOAD(status: boolean) {
		this.firstLoad = status;
	}

	@Mutation
	SET_HAS_DISCONNECTED(status: boolean) {
		this.hasDisconnected = status;
	}

	@Mutation
	RESET() {
		this.firstLoad = true;
		this.disabled = true;
		this.placeholder = 'Write your name';
		this.hasDisconnected = false;
		this.messages = [];
	}

	@Mutation
	SET_OPEN(status: boolean) {
		this.open = status;
	}

	@Mutation
	SET_DISABLED(status: boolean) {
		this.disabled = status;
	}

	@Mutation
	SET_PLACEHOLDER(text: string) {
		this.placeholder = text;
	}

	@Mutation
	ADD_MESSAGE(message: ChatMessage) {
		this.messages.push(message);
	}

}

interface ChatMessage {
	text: string;
	fromUser: boolean;
}

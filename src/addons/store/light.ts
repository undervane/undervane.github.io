import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { sleep } from "@/utils";

@Module({ namespaced: true })
export class LightModule extends VuexModule {

	status = 0;
	lastPosition = { x: 0, y: 0 };

	@Mutation
	toggleStatus() {
		this.status = this.status === 0 ? 1 : 0;
	}

	@Mutation
	setLastPosition({ pageX, pageY }) {
		this.lastPosition = { x: pageX, y: pageY };
	}

	@Action
	toggle(payload) {

		this.context.commit('setLastPosition', payload);
		this.context.commit('toggleStatus');

		return payload;
	}

	@Action
	async calculate() {

		const dayStatus = await (await fetch('https://day-status.now.sh/isDay')).json();

		if (!dayStatus) {
			return;
		}

		if (!dayStatus.isDay) {

			await sleep(1500);

			const sun = document.getElementById('sun-core');

			if (sun === null || sun === undefined) {
				return;
			}

			const { left, top, width, height } = sun.getBoundingClientRect();

			const position = { pageX: left + width / 2, pageY: top + height / 2 };

			this.context.dispatch('toggle', position);
		}

		return dayStatus.isDay;
	}
}

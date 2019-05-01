
export const sleep = (ms: number = 1000) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), ms);
	});
};

module.exports = function* fetchActor({ dispatch, parent }) {
	while (true) {
		const msg = yield;

		switch (msg.type) {
			case "STOP":
				break;

			case "REQUEST":
				fetch(msg.url, msg.options)
					.then((response) => {
						if (msg.transform === "json") {
							return response.json();
						} else {
							return response.text();
						}
					})
					.then((data) =>
						dispatch(msg.src, {
							type: "RESPONSE",
							data,
							request: msg,
						}),
					);
		}
	}
};

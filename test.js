global.fetch = require("node-fetch");
const createActorSystem = require("@little-bonsai/ingrates");

const fetchActor = require("./src");

createActorSystem()(async function* testActor({ spawn, dispatch, query }) {
	const fetcher = spawn(fetchActor);

	dispatch(fetcher, {
		type: "REQUEST",
		url: "https://jsonplaceholder.typicode.com/todos/1",
		transform: "json",
		method: "GET",
	});

	const response2 = await query(fetcher, {
		type: "REQUEST",
		url: "https://jsonplaceholder.typicode.com/todos/2",
		transform: "json",
		method: "GET",
	});

	console.log(response2);

	while (true) {
		const response1 = yield;
		console.log(response1);
	}
});

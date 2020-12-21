# Ingrates-fetch

> An actor for fetching things

This package provides a simple [ingrates][ingrates] actor for making fetch requests. It response includes the request that triggered it, to act as a simple identifier.

## Example

```javascript
global.fetch = require("node-fetch");
const createActorSystem = require("@little-bonsai/ingrates");

const fetchActor = require("./src");

createActorSystem()(async function* testActor({ spawn, dispatch, query }) {
  const fetcher = spawn(fetchActor);

  dispatch(fetcher, {
    type: "REQUEST",

    transform: "json",
    url: "https://jsonplaceholder.typicode.com/todos/1",
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  });

  const response2 = await query(fetcher, {
    type: "REQUEST",

    transform: "json",
    url: "https://jsonplaceholder.typicode.com/todos/2",
  });

  console.log(response2);

  while (true) {
    const response1 = yield;
    console.log(response1);
  }
});
```

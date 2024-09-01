import { customJson } from "./customJson.ts";

// If you want to get JSON using response.json
const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const jsonData = await response.json();
console.log("response.json():", jsonData);

// If you want to get JSON using customJson
const response2 = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const jsonData2 = await customJson(response2);
console.log("customJson():", jsonData2);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.scss";

import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:4001";
const ENDPOINT = "https://6d707240a653.ngrok.io/";

console.log("initiating socket connection ...");
const socket = socketIOClient(ENDPOINT);

ReactDOM.render(
	<React.StrictMode>
		<App socket={socket} />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

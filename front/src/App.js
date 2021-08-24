import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Switch } from "@blueprintjs/core";

import Player from "./components/player";
import Controls from "./components/controls";
import Loader from "./components/loader";
import VideoChat from "./components/videoChat";

function App({ socket }) {
	const playerRef = useRef(null);

	const [darkTheme, setDarkTheme] = useState(true);
	useEffect(() => {
		if (darkTheme) {
			document.body.classList.add("bp3-dark");
		} else {
			document.body.classList.remove("bp3-dark");
		}
	}, [darkTheme]);

	const [volume, setVolume] = useState(1);
	const volumeSetter = (vol) => {
		setVolume(vol);
	};

	const [playing, setPlaying] = useState(true);
	const [url, setUrl] = useState("");
	const urlSetter = (input_url) => {
		setUrl(input_url);
	};

	useEffect(() => {
		socket.on("play/pause", (is_playing) => {
			setPlaying(is_playing);
		});
		socket.on("shareUrl", (url) => {
			console.log("received url:", url);
			setUrl(url);
		});
		socket.on("seekTo", (time) => {
			console.log("received seekTo:", time);
			playerRef.current.seekTo(parseFloat(time));
		});
		socket.on("sync", (time) => {
			console.log("received sync request:", time);
			if (playerRef.current.getCurrentTime() > time) {
				playerRef.current.seekTo(parseFloat(time));
			}
		});
	}, [socket]);

	return (
		<div className="App">
			<Navbar fixedToTop={true}>
				<NavbarGroup className="left-nav">
					<NavbarHeading>Ma3an</NavbarHeading>
					<NavbarDivider />
				</NavbarGroup>
				<NavbarGroup className="center-nav">
					<Loader socket={socket} setUrl={urlSetter} />
				</NavbarGroup>
				<NavbarGroup className="right-nav">
					<NavbarDivider />
					<Switch
						large
						label="Dark/light"
						onChange={() => setDarkTheme(darkTheme ? false : true)}
						className="vam"
					/>
				</NavbarGroup>
			</Navbar>
			<Player socket={socket} parentUrl={url} playerRef={playerRef} playing={playing} volume={volume} />
			<VideoChat socket={socket} />
			<Controls
				socket={socket}
				playerRef={playerRef}
				playing={playing}
				volume={volume}
				setVolume={volumeSetter}
			/>
		</div>
	);
}

export default App;

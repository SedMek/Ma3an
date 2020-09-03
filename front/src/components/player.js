import React from "react";
import ReactPlayer from "react-player";

const Player = ({ socket, parentUrl, playerRef, playing, volume }) => {
	return (
		<ReactPlayer
			className="no-click"
			ref={playerRef}
			width="100%"
			height="540px"
			url={parentUrl}
			playing={playing}
			volume={volume}
		/>
	);
};

export default Player;

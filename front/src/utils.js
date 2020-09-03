export const playpause = (io, isPlaying) => {
	io.emit("play/pause", isPlaying);
};

export const sync = (io, currentTime) => {
	io.emit("sync", currentTime);
};

export const shareUrl = (io, url) => {
	io.emit("shareUrl", url);
};

export const seekTo = (io, time) => {
	io.emit("seekTo", time);
};

export const volumeIcon = (volume) => {
	if (volume >= 0.5) {
		return "volume-up";
	} else if (volume < 0.5 && volume > 0) {
		return "volume-down";
	} else {
		return "volume-off";
	}
};

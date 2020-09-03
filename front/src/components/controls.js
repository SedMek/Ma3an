import React from "react";
import {
	Button,
	Intent,
	ButtonGroup,
	Icon,
	Divider,
	Popover,
	PopoverInteractionKind,
	PopoverPosition,
	Slider,
	Navbar,
	NavbarGroup,
} from "@blueprintjs/core";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";

import { playpause, sync, seekTo, volumeIcon } from "../utils";

const Controls = ({ socket, playerRef, playing, volume, setVolume }) => {
	return (
		<Navbar className="bottom-navbar" id="controls">
			<NavbarGroup className="left-nav">
				<Button
					icon={<Icon icon="stop" iconSize={38} />}
					intent={Intent.DANGER}
					outlined
					onClick={() => sync(socket, 0)}
				/>
				<Divider />
			</NavbarGroup>
			<NavbarGroup className="center-nav">
				<ButtonGroup className="auto-marging">
					<Button
						intent={Intent.WARNING}
						outlined
						icon={<Icon icon="double-chevron-left" iconSize={38} />}
						onClick={() => seekTo(socket, playerRef.current.getCurrentTime() - 10)}
					/>
					<Button
						icon={<Icon icon={playing ? "pause" : "play"} iconSize={38} />}
						onClick={() => playpause(socket, !playing)}
						intent={playing ? Intent.WARNING : Intent.SUCCESS}
					/>
					<Button
						intent={Intent.WARNING}
						outlined
						icon={<Icon icon="double-chevron-right" iconSize={38} />}
						onClick={() => seekTo(socket, playerRef.current.getCurrentTime() + 10)}
					/>
					<Divider />
					<Popover
						interactionKind={PopoverInteractionKind.HOVER}
						position={PopoverPosition.RIGHT}
						content={<Slider min={0} max={1} stepSize={0.05} onChange={(e) => setVolume(e)} value={volume} />}
					>
						<Button
							icon={<Icon icon={volumeIcon(volume)} iconSize={38} />}
							intent={Intent.WARNING}
							outlined={volume}
							onClick={() => {
								volume ? setVolume(0) : setVolume(0.5);
							}}
						/>
					</Popover>
				</ButtonGroup>
				<Divider />
			</NavbarGroup>
			<NavbarGroup className="right-nav">
				<ButtonGroup>
					<Button
						icon={<Icon icon="refresh" iconSize={38} />}
						onClick={() => seekTo(socket, playerRef.current.getCurrentTime())}
						intent={Intent.WARNING}
						outlined
					/>
					<Button
						icon={<Icon icon="maximize" iconSize={38} />}
						onClick={() => screenfull.request(findDOMNode(playerRef.current))}
					/>
				</ButtonGroup>
			</NavbarGroup>
		</Navbar>
	);
};

export default Controls;

import React, { useState } from "react";
import {
	Button,
	Alignment,
	ButtonGroup,
	Tooltip,
	Position,
	Popover,
	PopoverInteractionKind,
	H2,
	Intent,
	InputGroup,
} from "@blueprintjs/core";

import { shareUrl } from "../utils";

const Loader = ({ socket, setUrl }) => {
	const [privately, is_privately] = useState(false);
	const [publicly, is_publicly] = useState(false);

	const urlLoadButton = (
		<ButtonGroup>
			<Popover
				interactionKind={!privately ? PopoverInteractionKind.CLICK : PopoverInteractionKind.HOVER}
				hoverCloseDelay={2000}
				onClosed={() => is_privately(false)}
				content={<H2>Why so lonely?</H2>}
			>
				<Tooltip content={<span>Watch privately</span>} position={Position.RIGHT} intent={Intent.PRIMARY}>
					<Button
						icon="arrow-right"
						onClick={() => {
							is_privately(true);
							setUrl(document.getElementById("url_input").value);
						}}
						Alignment={Alignment.CENTER}
						intent={Intent.WARNING}
					></Button>
				</Tooltip>
			</Popover>
			<Popover
				interactionKind={!publicly ? PopoverInteractionKind.CLICK : PopoverInteractionKind.HOVER}
				hoverCloseDelay={2000}
				onClosed={() => is_publicly(false)}
				content={<H2>Have fun!</H2>}
			>
				<Tooltip content={<span>Watch publicly!</span>} position={Position.RIGHT} intent={Intent.PRIMARY}>
					<Button
						icon="fork"
						onClick={() => {
							is_publicly(true);
							shareUrl(socket, document.getElementById("url_input").value);
						}}
						intent={Intent.WARNING}
					></Button>
				</Tooltip>
			</Popover>
		</ButtonGroup>
	);

	return (
		<InputGroup
			className="auto-marging"
			id="url_input"
			type="url"
			intent={Intent.WARNING}
			leftIcon="search"
			rightElement={urlLoadButton}
			placeholder="Put video url..."
		/>
	);
};
export default Loader;

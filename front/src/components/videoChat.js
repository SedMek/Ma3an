import React, { useEffect, useState, useRef } from "react";
import Peer from "simple-peer";
import { Card, Button, Icon, Intent, H3, ProgressBar } from "@blueprintjs/core";
import { Row, Col } from "react-flexbox-grid";

const VideoChat = ({ socket }) => {
	const userVideo = useRef();
	const partnerVideo = useRef();
	const [calling, setCalling] = useState(false);
	const [receivingCall, setReceivingCall] = useState(false);
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState();
	const [stream, setStream] = useState();

	function callPeer() {
		setCalling(true);
		console.log("Calling...");

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});

		peer.on("signal", (data) => {
			console.log("Peer on Signal calling");
			socket.emit("callUser", data);
		});

		peer.on("stream", (stream) => {
			console.log("Peer on Stream calling");
			if (partnerVideo.current) {
				partnerVideo.current.srcObject = stream;
			}
		});

		socket.on("callAccepted", (signal) => {
			console.log("socket on callAccepted calling");
			setCallAccepted(true);
			setCalling(false);
			peer.signal(signal);
		});
	}

	function acceptCall() {
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});

		peer.on("signal", (data) => {
			console.log("peer on Signal accepting");
			socket.emit("acceptCall", data);
		});

		peer.on("stream", (stream) => {
			console.log("peer on stream accepting");
			partnerVideo.current.srcObject = stream;
		});

		if (callerSignal) {
			peer.signal(callerSignal);
		}
	}

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream);
			if (userVideo.current) {
				userVideo.current.srcObject = stream;
			}
		});

		socket.on("hey", (signal) => {
			setCallerSignal(signal);
			setReceivingCall(true);
		});
	}, [socket]);

	let UserVideo;
	if (stream) {
		UserVideo = <video width="100%" playsInline muted ref={userVideo} autoPlay />;
	}

	let PartnerVideo;
	if (!receivingCall && !calling) {
		PartnerVideo = (
			<Button
				icon={<Icon icon="phone" iconSize={40} />}
				intent={Intent.PRIMARY}
				onClick={() => {
					callPeer();
				}}
				className="marging-auto"
			>
				<H3> Call Peer </H3>
			</Button>
		);
	} else if (calling) {
		PartnerVideo = <ProgressBar intent={Intent.PRIMARY} />;
	} else {
		PartnerVideo = (
			<Button
				icon={<Icon icon="headset" iconSize={40} />}
				intent={Intent.SUCCESS}
				onClick={() => acceptCall()}
				className="marging-auto"
			>
				<H3> Accept call </H3>
			</Button>
		);
	}
	if (callAccepted) {
		PartnerVideo = <video width="100%" playsInline ref={partnerVideo} autoPlay />;
	}

	return (
		<Row around="xs">
			<Col key={1} xs lg={2}>
				<Card interactive={true}>{UserVideo}</Card>
			</Col>
			<Col key={2} xs lg={2}>
				<Card interactive={true}>{PartnerVideo}</Card>
			</Col>
		</Row>
	);
};
export default VideoChat;

import { useCallback, useEffect, useState } from "react";
import { useSocket } from "./Context/Socket";
import { useLocalStorage } from "@uidotdev/usehooks";
import { usePeer } from "./Context/Peer";
import ReactPlayer from "react-player";
import "./VideoCall.css";
const VideoCall = () => {
  const { socket } = useSocket();
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [joined, setJoined] = useState(false);
  const [remoteName, setRemoteName] = useState(null);
  const [myName, setMyName] = useState("");
  const [myStream, setMyStream] = useState(null);
  const {
    peer,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    sendStream,
    remoteStream,
    setRemoteStream,
  } = usePeer();
  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      sendStream(stream);
      setMyStream(stream);
    } catch (error) {
      console.error("Video failed, trying audio only", error);
      try {
        const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        sendStream(audioOnlyStream);
        setMyStream(audioOnlyStream);
      } catch (audioError) {
        console.error("Audio failed as well", audioError);
      }
    }
  }, [peer]);

  useEffect(() => {
    socket.emit("join-room", { token: jwtToken });
    const onJoined = (data) => {
      setJoined(true);
      console.log(data.message);
      setMyName(data.name);
    };
    const onIncomingCall = async (data) => {
      const { name, offer } = data;
      setRemoteName(name);
      const answer = await createAnswer(offer);
      socket.emit("call-accepted", { answer, name: name });
    };
    const onMessage = async (data) => {
      const { user_name } = data;
      alert(user_name);
      setRemoteName(user_name);
      const offer = await createOffer();
      socket.emit("offer", { offer: offer, name: user_name });
    };
    const onCallAccepted = async (data) => {
      const { answer } = data;
      await setRemoteAnswer(answer);
    };
    socket.on("joined", onJoined);
    socket.on("incoming_call", onIncomingCall);
    socket.on("message", onMessage);
    socket.on("call-accepted", onCallAccepted);
    return () => {
      socket.off("joined", onJoined);
      socket.off("incoming_call", onIncomingCall);
      socket.off("message", onMessage);
      socket.off("call-accepted", onCallAccepted);
    };
  }, [socket]);
  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);
  const handleNego = async () => {
    alert(remoteName);
    const offer = await createOffer();
    socket.emit("message", { offer: offer, user_name: remoteName });
  };
  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNego);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNego);
    };
  }, [remoteName]);
  if (!joined) {
    return (
      <div>
        <h1>joining...</h1>
      </div>
    );
  }
  return (
    <>
      <div className="navtop">
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="#ffffff"
            class="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
        </a>
        Video Call
      </div>
      <div className="call">
        <ReactPlayer
          url={myStream}
          playing
          muted
          width={"45%"}
          style={{ backgroundColor: "#000" }}
        />
        {remoteStream != null ? (
          <ReactPlayer
            url={remoteStream}
            playing
            width={"45%"}
            style={{ backgroundColor: "#000" }}
          />
        ) : (
          <>waiting for an admin...</>
        )}
      </div>
    </>
  );
};
export default VideoCall;

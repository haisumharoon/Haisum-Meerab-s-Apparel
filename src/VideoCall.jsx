import { useCallback, useEffect, useState } from "react";
import { useSocket } from "./Context/Socket";
import { useLocalStorage } from "@uidotdev/usehooks";
import { usePeer } from "./Context/Peer";
import ReactPlayer from "react-player";

const VideoCall = () => {
  const { socket } = useSocket();
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [joined, setJoined] = useState(false);
  const [myName, setMyName] = useState("");
  const [myStream, setMyStream] = useState(null);
  const { peer, createOffer, createAnswer, setRemoteAnswer } = usePeer();
  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
    } catch (error) {
      console.error("Video failed, trying audio only", error);
      try {
        const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
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
      const answer = await createAnswer(offer);
      socket.emit("call-accepted", { answer, name: name });
    };
    const onMessage = async (data) => {
      const { user_name } = data;
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
  if (!joined) {
    return (
      <div>
        <h1>joining...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Video Call</h1>
      <ReactPlayer url={myStream} playing muted />
    </div>
  );
};
export default VideoCall;

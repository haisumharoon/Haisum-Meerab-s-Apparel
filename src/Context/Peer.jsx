import { createContext, useContext, useEffect, useMemo, useState } from "react";

const PeerContext = createContext();
export const usePeer = () => {
  return useContext(PeerContext);
};
export const PeerProvider = ({ children }) => {
  const [remoteStream, setRemoteStream] = useState(null);
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun1.l.google.com:19302",
            ],
          },
        ],
      }),
    []
  );

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async (offer) => {
    await peer
      .setRemoteDescription(offer)
      .then(() => {
        console.log("Remote description set successfully");
      })
      .catch((error) => {
        console.error("Error setting remote description:", error);
      });
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };
  const setRemoteAnswer = async (answer) => {
    await peer.setRemoteDescription(answer);
  };
  const sendStream = async (stream) => {
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  };
  const handleTrackEvent = (ev) => {
    const streams = ev;
    setRemoteStream(streams[0]);
  };
  useEffect(() => {
    peer.addEventListener("track", handleTrackEvent);
    return () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  }, []);
  return (
    <PeerContext.Provider
      value={{
        peer,
        createOffer,
        createAnswer,
        setRemoteAnswer,
        sendStream,
        remoteStream,
        setRemoteStream,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};

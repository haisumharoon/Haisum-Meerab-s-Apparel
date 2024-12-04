import { createContext, useContext, useMemo } from "react";

const PeerContext = createContext();
export const usePeer = () => {
  return useContext(PeerContext);
};
export const PeerProvider = ({ children }) => {
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

  return (
    <PeerContext.Provider
      value={{ peer, createOffer, createAnswer, setRemoteAnswer }}
    >
      {children}
    </PeerContext.Provider>
  );
};

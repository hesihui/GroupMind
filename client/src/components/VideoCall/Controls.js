import { useState } from "react";
import { useClient } from "./settings";
//import { Grid, Button } from "@material-ui/core";
import MicIcon from "./images/MicOn.png";
import MicOffIcon from "./images/MicOff.png";
import VideocamIcon from "./images/VideoOn.png";
import VideocamOffIcon from "./images/VideoOff.png";
import ExitToAppIcon from "./images/Exit.png";

export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div alignItems="center">
      <div>
        <button
          onClick={() => mute("audio")}
        >
          <img 
            src={ trackState.audio ? {MicIcon} : {MicOffIcon} } 
            alt="Audio"  
            />
        </button>
      </div>
      <div>
        <button
          onClick={() => mute("video")}
        >
          <img 
            src={ trackState.video ? {VideocamIcon} : {VideocamOffIcon} } 
            alt="Audio"  
            />
        </button>
      </div>
      <div>
        <button
          onClick={() => leaveChannel()}
        >Leave</button>
          <img src = {ExitToAppIcon} alt = "Exit"></img>
      </div>
    </div>
  );
}
//Settings page to initalize Agora API stuff
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

//Import the varaibles
import {ID, TOKEN} from './variables';

//app id for the app
const appId = ID

//temporary token for the app (limited time usage)
const token = TOKEN

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
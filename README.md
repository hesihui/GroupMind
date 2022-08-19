# GroupMind
Headstarter Summer Fellowship Week 6 Project <br>
GroupMind is a full stack application that enables users to plan meetups via a calendar, and meet with each other via video. <br>
The app has these main functionalities:
- User Authentication via Firebase
- Calendar Event Management via MongoDB
- Video Call Capability via Whereby

## Group Members and Responsibilities

| Name                                                           | Role                                                                                    |
|----------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Sihui He<br>https://github.com/hesihui                         | Calendar/Backend Server                                                                 |
| Russell Elliott<br>https://github.com/russellelliott           | Video Call                                                                              |
| Shakil Delowar<br>https://github.com/shakildelowar             | Video Call                                                                              |
| Daming Mei<br>https://github.com/dmei1                         | Video Call                                                                              |
| Raghavendra Raikar<br>https://github.com/RaghuRaikar           | Log-in & Navbar & Profile                                                               |
| Adriana Valencia<br>https://www.linkedin.com/in/adriavalencia/ | UX Designer<br>https://www.figma.com/file/pNiG9qqz3GBvwexrYuUE2V/Untitled?node-id=0%3A1 |

## Setup
Do `npm install` in the `client` and `server` subdirectories
- The `client` subdirectory houses the Firebase login, calendar event display, and video call.
- The `server` subdirectory manages the MongoDB server/database for the calendar events.
- Do `npm start` in the `client` and `server` dependencies.

## Secret Keys
There are several different secret keys for this project. Here is where they are all stored:

### Firebase Credentials
Variables stored in `GroupMind/client/src/variables.js`

```
export const API =  [apiKey]
export const AUTH =  [authDomain]
export const PROJ =  [projectId]
export const STOR = [storageBucket]
export const MESS = [messagingSenderId]
export const APP = [appId]
```

`firebaseconfig.js`
```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//Import the varaibles
import {API, AUTH, PROJ, STOR, MESS, APP} from './variables';
const firebaseConfig = {
    apiKey: API,
    authDomain: AUTH,
    projectId: PROJ,
    storageBucket: STOR,
    messagingSenderId: MESS,
    appId: APP
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();
  ```

#### How to get Firebase Credentials
https://firebase.google.com/docs/web/setup

### MongoDB Credentials
Variables stored in `GroupMind/server/.env`

```
PORT = 5000
CONNECTION_URL = [your connection URL]
```
#### How to get MongoDB Credentials
https://hevodata.com/learn/mongodb-atlas-nodejs/

### Whereby URL
Variables Stored in `GroupMind/client/src/components/VideoCall/variables.js`
```
export const URL=[your whereby videocall url]
```

#### How to get Whereby URL
In the dashboard, go to a room of your choosing, scroll down to embed to get the iframe code for the meeting. You can get the URL from there.

## Resources

### Google Authentication with React and Firebase
https://www.youtube.com/watch?v=cZAnibwI9u8

### Video Calling With Whereby
Used Whereby Embed to embed the Whereby videocall service into our app as an iframe.

#### Tutorial for Embedding Whereby into Website

##### How to create a room (no code)
https://docs.whereby.com/creating-and-deleting-rooms/using-create-a-room

##### Dashboard tutorial
https://www.youtube.com/watch?v=kWQDzPdYrBc
You can embed the video call capability into any website with a simple `<iframe>` you can copy-paste into your app.
<br>
To create a room, go to the dashboard. Fro m there, you will find a section that says “create room with no code”.  From there, click the buttons and follow the simple steps.
<br>
Room templates: you can select a meeting room template.
Room size: can be 2-4 people or 2-200 people. Once set, cannot be changed.

##### How to Embed Whereby into Your Website Embed
https://www.youtube.com/watch?v=kNhhpA_RXg4

Developer Guide -> Embedding rooms -> In a Web Page
https://docs.whereby.com/embedding-rooms/in-a-web-page

The video tutorial goes over using an iframe
https://docs.whereby.com/embedding-rooms/in-a-web-page/using-an-iframe

The code is very simple:
```
<iframe
src="https://subdomain.whereby.com/room?minimal"
allow="camera; microphone; fullscreen; speaker; display-capture"
></iframe>
```

Replace the subdomain with the subdomain you made. Go to the room you made and copy the url.

##### URL Parameters
https://docs.whereby.com/customizing-rooms/using-url-parameters <br>
This is used to customize the UI of the meeting room. We didn't change any of these for the project.

#### Camera Activation
By default, the camera turns on, even if the page isn't opened. The solution I implemented is that the videocall component is a seperate component which is displayed by clicking a button. This component is hidden by default so the camera isn't activated until you open the page. Reloading the page reverts the component to its hidden state.

##### Display iframe as Component:
https://www.delftstack.com/howto/react/react-iframe/

##### Display component with button:
https://bobbyhadz.com/blog/react-onclick-show-component
- We will use this to display the video meeting component if the user wishes to display it.
- By default, will not be displayed.

##### Adjusting height of div in React
https://bobbyhadz.com/blog/react-div-full-height

### Calendar
- Used React Toast for notifications.
- Used MongoDB for storing the events. See the README in the `server` directory for more info about how to set up the server.
#### React JS Calendar App
https://www.youtube.com/watch?v=lyRP_D0qCfk

#### React FullCalendar Realtime Events
https://www.youtube.com/watch?v=RE3yBdb8ijs

### Deleting `.DS_Store` Files
.DS_Store files may appear in your staged changes. Here is how to delete them if the `.gitignore` isn't successful at doing so. <br>
https://stackoverflow.com/questions/30483670/delete-ds-store-files-in-current-folder-and-all-subfolders-from-command-line-on
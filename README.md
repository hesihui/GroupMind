# GroupMind
Headstarter Summer Fellowship Week 6 Project <br>
GroupMind is a full stack application that enables users to plan meetups via a calendar, and meet with each other via video.
The app has these main functionalities
- User Authentication via Firebase
- Calendar Event Management via MongoDB
- Video Call Capability via Agora

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

### Agora Credentials
Variables Stored in `GroupMind/client/src/components/VideoCall/`

```
export const ID=[your app ID]
export const TOKEN=[Temp token for audio/video call]
```

#### How to get Temporary token
- Go to Console -> Project Management
    - https://console.agora.io/
- Select the Project you want
- Click “Config”
- Scroll down to “Temp token for audio/video call”. Click the link.
- For the channel name, I did. “main”
- Click “Generate” to generate the temporary token


## Resources

### Google Authentication with React and Firebase
https://www.youtube.com/watch?v=cZAnibwI9u8

### Video Calling App With Agora

#### React Video Calling App
https://www.youtube.com/watch?v=lUrWJVCCVGc

#### Source Code
https://github.com/techwithtim/Agora-Group-Video-Calling

#### Agora SDK Wrapper
https://github.com/AgoraIO-Community/agora-rtc-react/tree/v1.0.1
`npm install git://github.com/AgoraIO-Community/agora-rtc-react#v1.0.1`

#### Attempt 1: Uninstalling `materials-ui`, using HTML elements
This resource used an outdated library called `materials-ui` for icons and styling. Here is how we substituted their elements for displaying the video
- Grid -> div
- Button -> button
- Tried to convert the icons to images, but that had limited success. So, used buttons instead.

##### Import Image
Instead of the outdated libaries for icons. Attempted to use images. Limited success.<br>
https://stackoverflow.com/questions/43823289/how-to-import-image-svg-png-in-a-react-component <br>
https://stackoverflow.com/questions/55269749/dynamically-change-image-source-based-on-boolean-value <br>
https://www.codegrepper.com/code-examples/javascript/set+image+source+from+react <br>
https://betterprogramming.pub/how-to-display-images-in-react-dfe22a66d5e7 <br>



##### Ternary Operators for Images/Buttons
Used buttons to indicate whether video/audio was on or off.<br>
https://www.codegrepper.com/code-examples/javascript/ternary+operator+in+button+react <br>
https://stackoverflow.com/questions/55269749/dynamically-change-image-source-based-on-boolean-value <br>

Unfortunately, we couldn’t get the video to display.

#### Attempt 2: Upgrading to `mui`
Next, we attempted to get the video working by installing a new version of `mui`.

##### Upgrading mui
The mui version and code used in the video is outdated. Here's how to upgrade:

##### Migration
https://mui.com/material-ui/migration/migration-v4/

##### Installation
If you haven't already, uninstall the old version of materialui.
https://stackoverflow.com/questions/70546141/how-to-uninstall-material-ui-and-install-the-latest-mui/70824545#:~:text=Material%20UI%20has%20changed%20its,old%20%40material%2Dui%20packages.
`npm uninstall @material-ui/core @material-ui/icons and do npm install @mui/material`
`npm uninstall --save material-ui`

Then, install the new version of mui and modify the components accordingly.
- Import button: `import Button from "@mui/material/Button"`
- Import Grid: `import Grid from "@mui/material/Grid"`
- For the other components, change `material-ui` to `mui`
- Remove any instance of `color = "default"`


https://mui.com/getting-started/installation/<br>
https://mui.com/material-ui/getting-started/installation/<br>
https://mui.com/material-ui/material-icons/<br>
https://mui.com/material-ui/api/grid/<br>
https://mui.com/material-ui/api/button/

`npm install @mui/material @emotion/react @emotion/styled`
`npm install @mui/icons-material @mui/material @emotion/styled @emotion/react`

Even after this, we couldn't get the video to display.

### Calendar
#### React JS Calendar App
https://www.youtube.com/watch?v=lyRP_D0qCfk

#### React FullCalendar Realtime Events
https://www.youtube.com/watch?v=RE3yBdb8ijs

- Used React Toast for notifications.
- Used MongoDB for storing the events. See the README in the `server` directory for more info about how to set up the server.

### Deleting `.DS_Store` Files
.DS_Store files may appear in your staged changes. Here is how to delete them if the `.gitignore` isn't successful at doing so. <br>
https://stackoverflow.com/questions/30483670/delete-ds-store-files-in-current-folder-and-all-subfolders-from-command-line-on


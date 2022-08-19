import {URL} from "./variables"
export default function VideoCallDisplay(){
    return (
        <div>          
       <iframe
       src={URL}
       style = {{width: "100%", height:"80vh"}}
       allow="camera; microphone; fullscreen; speaker; display-capture"/>         
     </div>
    ) 
 }  
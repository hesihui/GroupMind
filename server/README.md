# GroupMind Calendar Server
This is the server for the calendar within the GroupMind app. Follow these structure:

Set up a MongoDB Atlas Cluster
https://hevodata.com/learn/mongodb-atlas-nodejs/

Put your credentials in the `.env` file in this directory. Check out the `.env_sample` for the formatting. It looks something like this:
```
PORT = 5000
CONNECTION_URL = [your connection URL]
```

Do `npm install`
Do `npm start`. The server will be deployed on port 5000.
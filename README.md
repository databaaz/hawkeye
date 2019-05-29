# HawkEye - Identify Almost Anything !
This project was created as a take-home assignment for my next job at soulskill.com

## Summary
- The back-end is served on **Nodejs Express** server, and front-end is designed in **Reactjs**.
- We are using **Tensorflowjs** for object detections in the back-end.
- Ideally, Tensorflowjs is best suitable to make detections in browser, and that's what I wanted to do here, but the requirement wanted me to setup a node server, so model predictions are being done on the back-end server
- The model being used is **MobileNet**, trained on **COCO dataset** - a dataset of 90 different kinds of common objects.
- Back-end receives image file as Form Data, and returns predicted bounding boxes co-ordinates along with its class to front-end client.
- Front-end client uses the co-ordinates and draws bounding boxes along with its class label on a canvas, converts this canvas into image and shows it.
- Back-end code can be found in server directory, while front-end code can be found in client directory.
- We will have to separately start both the client and the server.

## Instructions set things up (locally)

Clone this repo to your local machine.  
After the repo is cloned on your machine, enter the project directory:  
`cd hawkeye`

## Prerequisites:
You need to have `nodejs` and `npm` installed on your machines for app to run, both for back-end and client-side app.
If you do not have them already, install them using apt-get commands:  
`sudo apt-get install nodejs`  
`sudo apt-get install npm`  

## Setting up Back-end

 Enter the server directory:  
`cd server`  
Now run the following commands:
### `npm install`
This will install all the dependencies mentioned in package.json file, that are required for your server.

### `sudo PORT=80 npm start`
This runs the start script specified in your package.json file, and serves the back-end on port 80 of your machine.  
Once you see the message `model loaded !`, you are good to go.


## Setting up Front-end

 Enter the client directory:  
`cd client`
Now run the following commands:
### `npm install`
This will install all the dependencies mentioned in package.json file, that are required for React App.

### `REACT_APP_API='http://127.0.0.1' npm start`
This will fire up your React App on a development server.  
Here we are providing an environment variable called `REACT_APP_API`, that stores the address where your back-end is hosted, which in this case happens to be your local host i.e 127.0.0.1 .  
This option is particularly useful when your app is deployed in production and your front-end and back-end are served on different machines.  

## Demo
You can test the app without actually building and running it.  
You can play around [here](https://hawkeye.databaaz.me)



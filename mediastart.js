const path = require('path');
const fs = require('fs');
var Recorder = require('rtsp-recorder');
const glob = require('glob');
var strtotime = require('strtotime');



const VIDEOS = path.join(__dirname, 'videos');

  //Camera Authentication
  var ip_address = "122.163.24.251"
  //camera username and password
  var username = "admin";
  var password="admin123";
  //rtsp://admin:admin123@122.163.24.251:554/live
  //A channel of camera stream
  

var rec = new Recorder({
  url: 'rtsp://' + username + ':' + password + '@' + ip_address +':554/live', //url to rtsp stream
  timeLimit: 10, //length of one video file (seconds)
  folder: 'public/videos/', //path to video folder
  prefix: 'vid-', //prefix for video files
  movieWidth: 1280, //width of video
  movieHeight: 720, //height of video
  maxDirSize: 1024*20, //max size of folder with videos (MB), when size of folder more than limit folder will be cleared
  maxTryReconnect: 15 //max count for reconnects

});




//start recording
rec.initialize();

//start stream to websocket, port 8001
rec.wsStream(9999);

//moving all the video files from server to S3

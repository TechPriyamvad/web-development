//select record button
let vidRecordBtn = document.querySelector('.recordBtnId');

//hardare devices which we want to access and give permissions
let constraints = { video: true, audio: true };

let captureBtn = document.querySelector('#click-picture');
//variable for recording related work
let mediaRecorder;

//initial state of recording button
let recordState = false;

//stores recording data in chunks
let chunks = [];

let videoPlayer = document.querySelector('video');
//let audioPlayer = document.querySelector('audio');

//when recording button is clicked start 
vidRecordBtn.addEventListener("click", function () {

    //wait for media recorder to start
    if (mediaRecorder != undefined) {
        //initial state of button
        //false:button is not clicked
        //true:button is clicked 
        
        if (recordState == false) {
            recordState = true;
            //recording start
            mediaRecorder.start();
            //change text of button
            vidRecordBtn.innerText = 'Recording...'
        }
        else {
            
            recordState =/*  */ false;
            //recording stopped
            mediaRecorder.stop();
            //change text of button
            vidRecordBtn.innerText = 'Record';
        }
    }
})
//media devices -> access hardware device
//getUserMedia -> function to get permissions for hardware device
//Permissions are allow and deny
navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    videoPlayer.srcObject=mediaStream;
    //audioPlayer.srcObject=mediaStream;
    //create media recorder
    //mediastream -> stores recording data
    mediaRecorder = new MediaRecorder(mediaStream);
    //when recording button is clicked and recorded data is available to browser
    //dump recorded data into chunks array
    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data)
    }
    //when recording button is clicked one more time
    //stop recording 
    //save data into a file
    mediaRecorder.onstop = function () {
        //store data of recording from array into a mp4 file
        //file is immutable -> it can only be read 
        let blob = new Blob(chunks, { type: 'video/mp4' });
        chunks = [];

        //downloading above created file
        let blobUrl = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'video.mp4';
        link.click();
        link.remove();
    }


})
//handling error
//if permission for video is not allowed by the browser
.catch(function (err) {
    console.log(err);
})

captureBtn.addEventListener('click',function()
{
    console.log('clicked');
    capture();
})

function capture()
{
    let c=document.createElement('canvas');
    c.width=videoPlayer.videoWidth;
    c.height=videoPlayer.videoHeight;
    let tool=c.getContext('2d');
    tool.drawImage(videoPlayer,0,0);
    let link=document.createElement('a');
    link.download='image.png';
    link.href=c.toDataURL();-
    link.click();
    link.remove();
    c.remove();
}
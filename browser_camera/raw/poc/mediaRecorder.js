let vidRecordBtn = document.querySelector('#record-video');
let constraints = { video: true, audio: true };
let mediaRecorder;
//initial state of recording button
let recordState = false;

//stores recording data in chunks
let chunks = [];

//when recording button is clicked
vidRecordBtn.addEventListener("click", function () {
    if (mediaRecorder != undefined) {
        if (recordState == false) {
            recordState = true;

            //start recording
            mediaRecorder.start();
            //change text of button
            vidRecordBtn.innerText = 'Recording...'
        }
        else {
            recordState = false;
            //stop recording
            mediaRecorder.stop();
            //change text of button
            vidRecordBtn.innerText = 'Downloading recording';
        }
    }
})

//media devices -> provides access to media input device
//getUserMedia -> function to get permissions for media input device
//Permissions are allow and deny
navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    //create media recorder interface/object
    //mediastream -> stores recording data
    mediaRecorder = new MediaRecorder(mediaStream);
    //when recording button is clicked and recorded data is available to browser
    //dump recorded data into chunks array
    //ondataavailable -> event handler called after few millisecond to collect recording data
    mediaRecorder.ondataavailable = function (e) {
        //data -> store recorded data of few millisecond
        // and push into array
        chunks.push(e.data)
    }

    //when recording button is clicked one more time
    //onstop -> event handler called when recording is stopped 
    //save data into a file
    mediaRecorder.onstop = function () {
        let blob = new Blob(chunks, { type: 'video/mp4' });
        chunks = [];
        let blobUrl = URL.createObjectURL(blob);
        var link = document.createElement('a');
        //set href attribute
        link.href = blobUrl;
        //set download attribute
        link.download = 'video.mp4';
        //simulate a mouse click
        link.click();
        //remove element from dom
        link.remove();
    }


}).catch(function (err) {
    console.log(err);
})
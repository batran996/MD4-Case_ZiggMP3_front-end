const firebaseConfig = {
    apiKey: "AIzaSyDfuezToRsQ7MTlKifl6AcTSH-AnsEFvmE",
    authDomain: "cadezingmp3.firebaseapp.com",
    projectId: "cadezingmp3",
    storageBucket: "cadezingmp3.appspot.com",
    messagingSenderId: "1016061216025",
    appId: "1:1016061216025:web:0061c3dcadd96cd4d47188",
    measurementId: "G-DRSDWS5BYH"
};
firebase.initializeApp(firebaseConfig);


var fbBucketName = 'videos';
var downloadURL;
var fileButton = document.getElementById('fileButton');

// listen for file selection
fileButton.addEventListener('change', function (e) {
    document.getElementById("loading").innerText="loading....."

    // get file
    var file = e.target.files[0];

    // create a storage ref
    var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);

    // upload file
    var uploadTask = storageRef.put(file);

    // The part below is largely copy-pasted from the 'Full Example' section from
    // https://firebase.google.com/docs/storage/web/upload-files

    // update progress bar
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            // save this link somewhere, e.g. put it in an input field
            downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById("loading").innerText="done"

        });

});

$('#create').click(function () {
    let uploadSong={};
    uploadSong.name=document.getElementById('title').value;
    uploadSong.song=downloadURL;
    uploadSong.idCategory=document.getElementById("category").value;
    console.log(uploadSong)



    $.ajax({
        url:"http://localhost:8080/api/song",
        method:'POST',
        data:JSON.stringify(uploadSong),
        contentType:'application/json; charset=UTF8',
        headers:{'Authorization':'Bearer '+window.localStorage.getItem('TOKEN_KEY')
        },
        success:function (data){
            console.log('data',data)
            document.getElementById('add').innerHTML = "create success!"
            return;
        },
        error: function (data){
            document.getElementById('add').innerHTML = "create failed ! "
        }
    })

})


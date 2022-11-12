import {
    getDownloadURL,
    getMetadata,
    getStorage,
    ref,
    uploadBytesResumable
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js'
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

export class Firebase {
    firebaseConfig = {
        apiKey: "AIzaSyDfuezToRsQ7MTlKifl6AcTSH-AnsEFvmE",
        authDomain: "cadezingmp3.firebaseapp.com",
        projectId: "cadezingmp3",
        storageBucket: "cadezingmp3.appspot.com",
        messagingSenderId: "1016061216025",
        appId: "1:1016061216025:web:0061c3dcadd96cd4d47188",
        measurementId: "G-DRSDWS5BYH"
    };
    storage;

    progress;
    url;
    location;

    constructor() {
        const app = initializeApp(this.firebaseConfig);
        this.storage = getStorage(app)
    }

    upload(file) {
        let location = ref(this.storage, this.location);
        const uploadTask = uploadBytesResumable(location, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
                $(this.progress).val(progress);
            }, (error) => {
                console.log("error ===>")
                console.log(error)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadUrl) => {
                        $(this.url).val(downloadUrl);
                    }
                )
            }
        )
    }

    setProgress(id) {
        this.progress = id;
    }

    setDownloadUrl(url) {
        this.url = url;
    }

    setLocation(location) {
        this.location = location;
    }

}
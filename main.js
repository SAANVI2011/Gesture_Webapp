prediction_1 = " ";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_qualit: 100
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (event) {
        document.getElementById("result").innerHTML="<img id='capture_image' src='"+event+"'>";
    });
}
console.log("ml5 version:",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jgRVOuteN/model.json", model_loaded);
function model_loaded(){
    console.log("model_loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The prediction is " + prediction_1;
    var speakThis = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(speakThis);
}

function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if (results[0].label == "Thumbs Up") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (results[0].label == "Thumbs Down") {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if (results[0].label == "Up") {
            document.getElementById("update_emoji").innerHTML = "&#128070";
        }

        }
    }

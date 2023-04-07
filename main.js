prediction1 = "";
prediction2 = "";


Webcam.set({

width:350,
height:300,
img_format: "jpeg",
jpeg_quality:90

});

camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot(){

Webcam.snap(function(data_uri){

document.getElementById("result").innerHTML = '<img id="capturedImage" src=" '+data_uri+' "> ';

})

}

console.log("ml5_version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/12xTgchUq/model.json", modelLoaded);

function modelLoaded(){

console.log("Model Loaded!");

}

function speak(){

var synth = window.speechSynthesis;
speakData1 = "The first prediction is "+ prediction1;
speakData2 = "And the second prediction is "+ prediction2;
utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
synth.speak(utterThis);

}

function predictEmoji(){

img = document.getElementById("capturedImage");
classifier.classify(img, gotResult);

}

function gotResult(error, result){

if(error){

console.error(error);

}
else{

console.log(result);

prediction1 = result[0].label;
prediction2 = result[1].label;
document.getElementById("result_emotion_name1").innerHTML = prediction1;
document.getElementById("result_emotion_name2").innerHTML = prediction2;
speak();


if(result[0].label == "Rock n' Roll"){

    document.getElementById("updateEmoji1").innerHTML = "&#129304;";

}
if(result[0].label == "Amazing"){

    document.getElementById("updateEmoji1").innerHTML = "&#128076;";

}
if(result[0].label == "Good Job!"){

document.getElementById("updateEmoji1").innerHTML = "&#128077;";

}
if(result[0].label == "Clap"){

document.getElementById("updateEmoji1").innerHTML = "&#128079;"

}



if(result[1].label == "Rock n' Roll"){

    document.getElementById("updateEmoji2").innerHTML = "&#129304;";

}
if(result[1].label == "Amazing"){

    document.getElementById("updateEmoji2").innerHTML = "&#128076;";

}
if(result[1].label == "Good Job!"){

document.getElementById("updateEmoji2").innerHTML = "&#128077;";

}
if(result[1].label == "Clap"){

document.getElementById("updateEmoji2").innerHTML = "&#128079;"

}


}
}
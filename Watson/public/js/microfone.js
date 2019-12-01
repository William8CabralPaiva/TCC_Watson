//webkitURL is deprecated but nevertheless

URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

//add events to those 2 buttons
gravarButton.addEventListener("click", startRecording);

function parar(){
	console.log("stopButton clicked");

	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	//rec.exportWAV(createDownloadLink);
		rec.exportWAV(exportaAudio, 'audio/wav');


	}
	
function gravar(){
	console.log("recordButton clicked");

	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false }


	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();

		//update the format 
		document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		//start the recording process
		rec.record()

		console.log("Recording started");

	}).catch(function(err) {
	  	//enable the record button if getUserMedia() fails
	});
}
function startRecording() {

	if(iconeclica===false){
		if(radio[0].checked){
			mensagemInput.value = 'Gravando...';
			$('#gravar_audio').css({'color': '#cc0000'});
			$("#mensagemInput").prop('disabled', true);
			recognition.start();
		}
		else{
			$('#gravar_audio').css({'color': '#cc0000'});
			$("#mensagemInput").prop('disabled', true);
			gravar();
		}
		iconeclica=true;
	}
	else{

		if(radio[0].checked){
			$("#mensagemInput").prop('disabled', false);
			$('#gravar_audio').css({'color': '#000'});
			mensagemInput.value = '';
			recognition.stop();
		}
		else{
			$("#mensagemInput").prop('disabled', false);
			$('#gravar_audio').css({'color': '#000'});
			parar();
		}
		$('#gravar_audio').css({'color': '#000'});
		iconeclica=false;

	}
}


function exportaAudio(blob) {
  
  var formData = new FormData();
	rec.clear();
	formData.append('fala', blob);
	
  	var xhr = new XMLHttpRequest();

	xhr.open('post', "/fala/", true);
  xhr.onreadystatechange = function () {//Call a function when the state changes.
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        //const msg = JSON.parse(xhr.responseText);
        let json = xhr.responseText;
        getWatsonMessageAndInsertTemplate(json);
		//const templat = templateChatMessage( json,"user","");
		//(usuario, msg, imagem, audio)
		const templat = montar_dialogo("user", json,usuarioLayout,"","");
        InsertTemplateInTheChat(templat);
        
        mensagemInput.value = '';
    }
}
xhr.send(formData);

  /*
  var resultado= await  fetch('http://localhost:3000/fala/',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fala:formData //'frase8.wav'
        }),
      });
      const json = await resultado.json();
      getWatsonMessageAndInsertTemplate(json);
    
      const templat = templateChatMessage(json, 'user',"");
      InsertTemplateInTheChat(templat);
      
      mensagemInput.value = '';
      console.log(json);
  

	/*var xhr = new XMLHttpRequest();

	xhr.open('post', '/audio/', true);

	let abc=xhr.send(formData);*/

}

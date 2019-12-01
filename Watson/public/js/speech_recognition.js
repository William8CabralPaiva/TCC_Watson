var message = document.querySelector('#message');
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = '#JSGF V1.0;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'pt-BR';
recognition.interimResults = false;

recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    console.log(command);
    getWatsonMessageAndInsertTemplate(command);
    
    //const templat = templateChatMessage(command, 'user',"");//TODO VERIFICAR ESSE templateCHatmessage (usuario, msg, imagem, audio)
    const templat = montar_dialogo("user", command,usuarioLayout,"","");
    InsertTemplateInTheChat(templat);

};

recognition.onspeechend = function() {
    console.log("ENCERROU")
    recognition.stop();
};

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}  


function audioparaTexto(){

fetch('http://localhost:3000/audio/',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text:(textoAudio),
      nomeAudio:`./public/audios/audio_${nome_aqr}.wav`,
    }),
  });
  
  var interval=setInterval(function(){
    if(verificaUrl(`../audios/audio_${nome_aqr}.wav`)){
      clearInterval(interval);
      //(usuario, msg, imagem, audio)
      const template=montar_dialogo("watson", response.output.text, roboLayout, OfflineAudioCompletionEvent,"");

      //const template = templateChatMessage(response.output.text, 'watson',OfflineAudioCompletionEvent);
  
      InsertTemplateInTheChat(template);
      
    }
  }, 500);
  
}

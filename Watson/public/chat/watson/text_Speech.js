
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

const fs = require('fs');



const textToSpeech = new TextToSpeechV1({
iam_apikey: "insira a api key",
url: "https://stream.watsonplatform.net/text-to-speech/api"
});
var fala_texto=async function(nomeAudio,texto)
{
  return new Promise(async function(resolve,reject){
    console.log("fala texto texto fala");

    const synthesizeParams = {
      text: texto,
      accept: 'audio/wav',
      voice: 'pt-BR_IsabelaVoice'
    };
    
    textToSpeech
    .synthesize(synthesizeParams, function(err, audio) {
      if (err) {
        console.log(err);
        resolve("error");
      }
      textToSpeech.repairWavHeader(audio);
      console.log(nomeAudio);
      fs.writeFileSync((nomeAudio), audio);
      resolve("testando audio...");
      console.log('audio.wav written with a corrected wav header');
  });
})
}
module.exports=fala_texto;
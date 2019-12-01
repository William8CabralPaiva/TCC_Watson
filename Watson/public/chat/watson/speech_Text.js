var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
var speechToText = new SpeechToTextV1({
  iam_apikey: 'insira a api key',
  url: 'https://stream.watsonplatform.net/speech-to-text/api'
});



var fala= async function(nomeAudio){
// Create the stream.
//await fs.writeFileSync(('teste.wav'), audio);
return new Promise(async function(resolve,reject){
 //await fs.writeFileSync('algo.ogg', nomeAudio);
  var params = {
    audio: fs.createReadStream('Audio.wav'),//nomeAudio
   // objectMode: true,
    content_type: 'audio/wav',
    model: 'pt-BR_BroadbandModel',
    //max_alternatives: 50
    /*
    keywords: [],
    keywords_threshold: 0.5,
    max_alternatives: 3
    */
  };

/*
 * Uncomment the following two lines of code ONLY if `objectMode` is `false`.
 *
 * WHEN USED TOGETHER, the two lines pipe the final transcript to the named
 * file and produce it on the console.
 *
 * WHEN USED ALONE, the following line pipes just the final transcript to
 * the named file but produces numeric values rather than strings on the
 * console.
 */
// recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

/*
 * WHEN USED ALONE, the following line produces just the final transcript
 * on the console.
 */
// recognizeStream.setEncoding('utf8');
// Listen for events.
speechToText.recognize(params, function (error, transcript) {
  if (error || transcript.results.length === 0)
      resolve(error);
  else
      resolve( transcript.results[0].alternatives[0].transcript);
});
//console.log(a);
//recognizeStream.on('error', function(event) { onEvent('Error:', event); });
//recognizeStream.on('close', function(event) { onEvent('Close:', event); });
})
}
// Display events on the console.

module.exports=fala;
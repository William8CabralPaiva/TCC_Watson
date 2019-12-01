const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');
const audio = require('./public/chat/watson/text_Speech');
const FALAWATSON=require('./public/chat/watson/speech_Text');
//const FALAGOOGLE=require('./public/chat/google/speech_Text');
const fs= require('fs');
const getStat = require('util').promisify(fs.stat);
const multer = require('multer');

const app = express();

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './');//uploads
  },
  filename: function (req, file, callback) {
      callback(null, 'Audio.wav');
  }
});
var upload = multer({
  storage: storage, fileFilter: function (req, file, cb) {
      cb(null, true);
  }
}).single('fala');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static('./public'));
const port = 3000;


const assistant = new AssistantV1({
    username:'apikey',
    password:'insira a password',
	url: 'https://gateway.watsonplatform.net/assistant/api/',
    version: '2019-02-28'
});

app.post('/conversation/', (req, res) => {
  const {text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'insira o  workspace id',
    context,
};
/*
const synthesizeParams = {
  text: 'Para Caramba você tem problema?',
  accept: 'audio/wav',
  voice: 'pt-BR_IsabelaVoice'
};

textToSpeech.synthesize(synthesizeParams, function (err, buffer) {
  if (err) {
    console.log(err);
  } else {
    buffer.pipe(fs.createWriteStream('audio89.wav')) // or whatever you want to do with the stream
  }
});
*/

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
      
      
    }
  });
  
});

app.post('/audio/', async(req, res) => {
 // const {text} = req.body;
 
 let audioGravado=audio(req.body.nomeAudio,req.body.text).
  then(frase=>{return frase}).catch(()=>{console.log("erro")})
  audioGravado.then(function(result){
    console.log(result);
    res.status(200).send(JSON.parse(`{"resultado":"${result}"}`));
    res.end('It worked!');
  })

//console.log(req.body);*/
});

app.post('/fala/', async(req, res) => {
  console.log("clique watson")
  let base64=req.body.fala;
  upload(req, res, function (err) {
    if (err) {
        res.status(500).send(err);
    }
    else {
      let falado=FALAWATSON(base64).then(frase=>{return frase}).catch(()=>{console.log("erro")})
      falado.then(function(result){
        res.send(result);
      })
    }
})

 });

 app.post('/fala/google', async(req, res) => {
  console.log("clique google")
  let base64=req.body.fala;
  /*upload(req, res, function (err) {
    if (err) {
        res.status(500).send(err);
    }
    else {
      let falado=FALAGOOGLE(base64).then(frase=>{return frase}).catch(()=>{console.log("erro")})
      falado.then(function(result){
        res.send(result);
      })
    }
})*/
FALAGOOGLE(base64);
 });

 app.get('/audio-gravado/:id', async (req, res) => {
   try{
      const highWaterMark =  64;
      const id = req.params.id;
      const filePath = `public/audios/${id}.wav`;
      const stat = await getStat(filePath);
      //console.log(stat);    
      
      // informações sobre o tipo do conteúdo e o tamanho do arquivo
      res.writeHead(200, {
          'Content-Type': 'audio/wav',
          'Content-Length': stat.size
      });

      const stream = fs.createReadStream(filePath, { highWaterMark });

      // só exibe quando terminar de enviar tudo
      stream.on('end', () => console.log('acabou'));

      // faz streaming do audio 
      stream.pipe(res);}
    catch(e)
    {
      console.log(e);
    }

});
app.listen(port, () => console.log(`Rodando na porta ${port}`));
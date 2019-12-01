
const mensagemInput = document.getElementById('mensagemInput');
const chat = document.getElementById('chat');
var gravarButton = document.getElementById("gravar_audio");
const radio = document.getElementsByName('speech');
var conta_msg_watson=0;
var iconeclica=false;

let context = { timezone:"America/Sao_Paulo"};

const getWatsonMessageAndInsertTemplate = async (text = '') => {
  const uri = 'http://localhost:3000/conversation/';

  const response = await (await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      context,
    }),
  })).json();

  context = response.context;
  var preco=0;
    if(response.output.hasOwnProperty('preco'))
    {
      preco=response.output.preco;
      console.log("Custa"+preco);
    }
    if(response.output.hasOwnProperty('url')){
      getMercadoLivre(response.output.mensagem, response.output.url,preco);
      console.log(response.output.url);
      context=null;
      let resposta= await (await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          context,
        }),
      })).json();
      context=resposta.context;
    }
    else
    {
      let opcoes="";
      if(response.output.hasOwnProperty('opcoes')){
       
        var Enum = {
          Smartphone: 0,
          Notebook: 1,
          MacBook: 2,
          Smartwatch: 3,
          Desktop:4,
          Teclado:5,
          Mouse:6,
          Impressora:7,

          properties: {
            0: {nome: "smartphone"},
            1: {nome: "notebook"},
            2: {nome: "macbook"},
            3: {nome: "smartwatch"},
            4:{nome:"desktop"},
            5:{nome:"teclado"},
            6:{nome:"mouse"},
            7:{nome:"impressora"},
          }
        };
        var arrayopcoes=[];
        let i=0;
        let dialogo_opcoes="";
        let lenght=parseInt(Object.keys(Enum).length-1, 10);
        while(i<3)
        {
            let num=Math.floor(Math.random() * lenght);      // returns a random integer from 0 to 10 
            if(!arrayopcoes.includes(Enum.properties[num].nome))
            {
                //alert("entro");
                arrayopcoes.push(Enum.properties[num].nome);
                i++;

                dialogo_opcoes+=`<li id="dialogo_${indice_caixa++}">${Enum.properties[num].nome}</li>`;
            }

        }
        opcoes =`<ul class="itens-opcoes">${dialogo_opcoes} </ul>`;
    
      }

      let data= new Date();
      let nome_aqr=data.getDate()+"-"+data.getMonth()+"-"+data.getFullYear()+"-"+
      data.getHours()+"-"+data.getMinutes()
      +data.getSeconds();
      let oAudio=`
      <audio class="audio-watson" id="audio_${nome_aqr}" preload="auto" controls>
        <source src="audio-gravado/audio_${nome_aqr}" >
      </audio>
      `;
      var textoAudio="";
      for(let i=0;i<response.output.text.length;i++)
      {
        textoAudio+=response.output.text[i];
        if(i!=(response.output.text.length-1))
        {
          textoAudio+=", ";
        }
      }

  console.log("pelo menos entro");
const geraaudiourl= await fetch('http://localhost:3000/audio/',{
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text:(textoAudio),//TODO ARRUMA
    nomeAudio:`./public/audios/audio_${nome_aqr}.wav`,
  }),
}).then(async ()=>{
  //(usuario, msg, imagem, audio)
  const template = montar_dialogo("watson",response.output.text,roboLayout,oAudio,opcoes);
  //const template = templateChatMessageWatson(response.output.text,oAudio);
  
  InsertTemplateInTheChat(template);
  var audiotag=document.getElementById("audio_"+nome_aqr);

  // $( audiotag ).audioPlayer();
//   setTimeout(function() {
//     $( audiotag ).audioPlayer();
//     clearInterval();
// }, 250);

//await $( audiotag ).audioPlayer();
$(audiotag).ready(function(){

  // let aux=indice_caixa;
  // for( let v of arrayopcoes)
  // {
    
  //   console.log(v);
  //   document.getElementById("dialogo_"+indice_caixa).addEventListener("click", function(){
  //     alert("foi");
  //   });  
  //   aux--;
  // }

  let audiog= document.getElementsByTagName('audio');
  for(let i=0;i<audiog.length;i++)
  {
    audiog[i].pause();
  }
  setTimeout(function() {
    audiotag.play();
    clearInterval();
  }, 100);

  chat.scrollTo(0,chat.scrollHeight);
});

  chat.scrollTo(0,chat.scrollHeight);
  //audiotag.play();
});
    }
    chat.scrollTo(0,chat.scrollHeight);
};

  $( "#exibe_chat" ).click(function() {
    $("audio").audioPlayer();;
    
  });
getWatsonMessageAndInsertTemplate();

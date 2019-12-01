function verificaUrl(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
  }
  var indice_caixa=0;
const roboLayout="../imagem/bot.png";
const usuarioLayout="../imagem/user.png";

const montar_dialogo =(usuario, msg, imagem, audio,opcoes)=>
  `<div class="bloco-message float-${usuario}">
      <div class='dialogo from-${usuario}'>
          <p>${msg}</p>
          <div class="avatar"><img class='img-circle' src='${imagem}' /></div>
      </div>
      ${audio}
      ${opcoes}
    </div>`
   
    ;
       
  /*
  const templateChatMessage = (message, from,audio) => `
    <div class="from-${from}">
      <div class="message-inner">
        <p>${message}</p>
        ${audio}
      </div>
    </div>
    `;
      
  const templateChatMessageWatson = (message,audio) => `
  <div class="from-watson">
    <div class="message-inner">
      <div class="o-bail">
        <div class="row">
          <div class="col-md-2 d-flex">
            <img class="watson" src="./imagem/bail.png" alt="">
          </div>
          <div class="col-md-10 o-centraliza">
          <p class="speech-bubble">${message}</p>
          </div>
        </div>
      </div>
    </div>
    ${audio}
  </div>
  `;*/
  
  
    const templateChatItems = (mensagem, html) => `
    <div>
      <div class="message-inner">
        <h2>${mensagem}</h2>
        ${html}
        </div>
    </div>
    `
  ;
  const itemTabela= (produtos,indice)=>
   `   <tr>
          <th rowspan="2">
              <img src="${produtos[indice].thumbnail}alt="${produtos[indice].title}">
          </th>
          <th>
            <a href="${produtos[indice].permalink}" target="_blank" style="text-shadow:2px 2px #000;color:#fff;text-decoration:none">${produtos[indice].title}</a>
          </th>
        </tr>
        <tr>
          <th>
          <span style="color:red;text-shadow:2px 2px #000;">Preço: ${produtos[indice].price}</span>
          </th>
        </tr>`;
  
  function redirecionaCompra(url) {
    window.open(url,"_blank");
  }
    const InsertTemplateInTheChat = (template) => {
    const div = document.createElement('div');
    div.innerHTML = template;
  
    chat.appendChild(div);
      if(template.includes("<ul")){
        let i=indice_caixa-3;
        while(i!=indice_caixa)
        {
          document.getElementById("dialogo_"+i).addEventListener("click", eventoClique);
            i++;
        }
      }
    // for(let i=0;i<indice_caixa;i++){
    //   let aux ="dialogo_"+i;
    //   document.getElementById(aux).addEventListener("click", function(){
    //     alert("oi")
    //   });
    // }

  };
  function eventoClique(event){
    var targetElement = event.target || event.srcElement;
    alert(targetElement.textContent);
    let templataux = montar_dialogo("user", targetElement.textContent,usuarioLayout,"","");

    getWatsonMessageAndInsertTemplate(targetElement.textContent);
    InsertTemplateInTheChat(templataux);
    for(let i=0;i<=indice_caixa;i++){
      document.getElementById("dialogo_"+i).removeEventListener("click", eventoClique);
    }
  }
  function criaTabela(resposta,preco_produto)
{
  let produtos=resposta.results;
  let metade=preco_produto/2;
      //ordena do mais barato apr ao mais caro
  produtos.sort(function(a,b) {
    return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
  });

  let html="<table>";
  preco_produto = (preco_produto*0.25)+preco_produto;
  
  for(item in produtos)
  {
    if(preco_produto!=0)
    {
      console.log(preco_produto);
      
      if(produtos[item].price<=preco_produto && 
          produtos[item].price >= metade )
      {
        html+=itemTabela(produtos,item)
      }
      //console.log(produtos[item].price+"´é menor igual a"+preco_produto);
    }
    else{
      html+=itemTabela(produtos,item);
    }
  }
  html+=`</table>`;
  return html;
}
mensagemInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13 && mensagemInput.value) {
      getWatsonMessageAndInsertTemplate(mensagemInput.value);
  
      //const templat = templateChatMessage(mensagemInput.value, 'user',"");
      //(usuario, msg, imagem, audio)
      const templat = montar_dialogo("user", mensagemInput.value,usuarioLayout,"","");
      InsertTemplateInTheChat(templat);
      
      mensagemInput.value = '';
    }
  });
  // btn_mensagem.addEventListener('click', function() { 
  //   // if(mensagemInput.value!="")
  //   // {
  //   //   getWatsonMessageAndInsertTemplate(mensagemInput.value);
  
  //   //   //const templat = templateChatMessage(mensagemInput.value, 'user',"");
  //   //   //(usuario, msg, imagem, audio)
  //   //   const templat = montar_dialogo("user", mensagemInput.value,usuarioLayout,"");
  //   //   InsertTemplateInTheChat(templat);
      
  //   //   mensagemInput.value = '';
  //   // }
  //   alert("teste");
  //  });
  // document.getElementById('enviar_mensagem').addEventListener("click", ()=>{
  //   if(mensagemInput.value!="")
  //   {
  //     getWatsonMessageAndInsertTemplate(mensagemInput.value);
  
  //     //const templat = templateChatMessage(mensagemInput.value, 'user',"");
  //     //(usuario, msg, imagem, audio)
  //     const templat = montar_dialogo("user", mensagemInput.value,usuarioLayout,"");
  //     InsertTemplateInTheChat(templat);
      
  //     mensagemInput.value = '';
  //   }
  //   else{
  //     alert("Prrencha o campo ou fale no microfone, para enviar a mensagem");
  //   }
  // });

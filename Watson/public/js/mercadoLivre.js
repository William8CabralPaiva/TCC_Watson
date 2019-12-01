const getMercadoLivre = async (mensagem,uri,preco_produto) => {
    //const uri = 'http://localhost:3000/mercadolivre/';
    //const uri = 'https://api.mercadolibre.com/sites/MLB/search?q=zatch+bell&limit=1';
    console.log(uri)
    const response = await (await fetch(uri, {
      method: 'GET',
    })).json();

    let html="";
    var resposta=response;

      html=criaTabela(resposta,preco_produto);
    
    //html+=`<p>${response.output.text}</p>`;
    if(html==`<table></table>`)
    {
      mensagem="Nenhum Produto Encontrado";
    }
    const templateItem = templateChatItems(mensagem, html);
    InsertTemplateInTheChat(templateItem);

};
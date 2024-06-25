document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.querySelectorAll('.add-btn');
    const listaCarrinho = document.querySelector('.lista-carrinho');
    let totalValor = 0.00;
  
    addButtons.forEach(button => {
      button.addEventListener('click', function() {
        const nomeProduto = this.parentElement.querySelector('.nome').innerText;
        const precoProduto = parseFloat(this.getAttribute('data-preco'));
  
        const itemCarrinho = document.createElement('li');
        itemCarrinho.innerHTML = `${nomeProduto} - R$ ${precoProduto.toFixed(2)}`;
        listaCarrinho.appendChild(itemCarrinho);
  
        totalValor += precoProduto;
        document.getElementById('total-valor').innerText = `R$ ${totalValor.toFixed(2)}`;
      });
    });
  
    const qrCodeBtn = document.getElementById('gerar-qrcode-btn');
    qrCodeBtn.addEventListener('click', function() {
      const valorTotal = totalValor.toFixed(2); // Valor total formatado para duas casas decimais
      const chavePix = '0760dd0b-d8c8-4929-ac19-bc14df79d7d2'; // Sua chave Pix
      const descricao = 'Compra de produtos';
      const payload = `pix://${chavePix}?v=${encodeURIComponent(valorTotal)}&desc=${encodeURIComponent(descricao)}`;
  
      const qrCodeDiv = document.getElementById('qrcode');
      qrCodeDiv.innerHTML = ''; // Limpa qualquer QR code anterior
  
      // Criar o QR Code utilizando a função toCanvas ou toDataURL da biblioteca qrcode.js
      const qrcode = new QRCode(qrCodeDiv, {
        text: payload,
        width: 300,
        height: 300,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    });
  });
  
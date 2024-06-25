// Importa a biblioteca qrcode
const QRCode = require('qrcode');

// Dados do PIX
const chavePix = '0760dd0b-d8c8-4929-ac19-bc14df79d7d2';  // Substitua pela sua chave PIX
const descricao = 'Descrição do pagamento';  // Descrição opcional do pagamento
const valor = 100.50;  // Valor do pagamento

// Estrutura dos dados PIX
const payload = {
  version: '1.0',
  key: chavePix,
  city: 'Cidade',
  name: 'Nome do recebedor',
  txId: 'ID da transação',
  value: valor.toFixed(2),
};

// Monta a URL do payload PIX
const url = `https://pix.example.com/pix/${encodeURIComponent(JSON.stringify(payload))}`;

// Gera o QR Code
QRCode.toDataURL(url, (err, url) => {
  if (err) {
    console.error(err);
    return;
  }
  // Imprime a URL do QR Code (pode ser usada em um elemento <img>)
  console.log(url);
});

// AMZ.js

// Função para lidar com o envio do formulário de registro
document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Captura os dados do formulário
  let usuario = document.getElementById('RIDUsuario').value;
  let email = document.getElementById('RIDEmail').value;
  let password = document.getElementById('RIDPassword').value;

  // Cria um objeto com os dados do registro
  let registro = {
      username: usuario,
      email: email,
      password: password
  };

  // Envia os dados para o servidor
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registro)
    });
    const result = await response.json();
    alert(result.message);
    // Limpa os campos do formulário
    document.getElementById('RIDUsuario').value = '';
    document.getElementById('RIDEmail').value = '';
    document.getElementById('RIDPassword').value = '';
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    alert('Ocorreu um erro ao registrar o usuário');
  }
});

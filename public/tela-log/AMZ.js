// Função para lidar com o envio do formulário de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Captura os dados do formulário
  let usuario = document.getElementById('IDUsuario').value;
  let email = document.getElementById('IDEmail').value;
  let password = document.getElementById('IDPassword').value;
  

  
  // Cria um objeto com os dados do registro
  let registro = {
      usuario: usuario,
      email: email,
      password: password
  };

  // Salva o registro no armazenamento local
  salvarRegistro(registro);

  // Limpa os campos do formulário
  document.getElementById('IDUsuario').value = '';
  document.getElementById('IDEmail').value = '';
  document.getElementById('IDPassword').value = '';
 

  // Exibe o registro no console após salvar
  console.log(registro);

  // Opcional: Pode-se adicionar uma mensagem de sucesso ou redirecionar o usuário para outra página aqui
});

// Função para salvar registro no LocalStorage
function salvarRegistro(registro) {
  // Verifica se já há registros salvos
  let registros = JSON.parse(localStorage.getItem('registros')) || [];

  // Adiciona o novo registro
  registros.push(registro);

  // Salva no LocalStorage
  localStorage.setItem('registros', JSON.stringify(registros));
}

// Chama a função para exibir os registros ao carregar a página (opcional, se houver uma lista de registros para exibir)
// mostrarRegistros();

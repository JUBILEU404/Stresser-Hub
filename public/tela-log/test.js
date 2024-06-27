// JavaScript for both login and register pages

// Função para salvar um novo usuário no localStorage
function saveUser(username, password) {
    // Verifica se o usuário já existe
    if (localStorage.getItem(username)) {
       alert(document.getElementById("registerMessage").textContent = "Este nome de usuário já está em uso. Por favor, escolha outro.") 
        return;
    }

    // Salva o usuário no localStorage
    localStorage.setItem(username, password);
   alert(document.getElementById("registerMessage").textContent = "Registro bem-sucedido! Você pode fazer login agora.") 
 
 window.location.href = "Tela-Login.html";
}

// Função para realizar o login
function loginUser(username, password) {
    const savedPassword = localStorage.getItem(username);
    
    if (!savedPassword) {
        document.getElementById("loginMessage").textContent = "Usuário não encontrado. Por favor, registre-se primeiro.";
        return;
    }
    
    if (savedPassword === password) {
        alert("Login bem-sucedido!");
        // Redireciona o usuário para outra página após o login
        
        window.location.href = "../deshbord/index.html";
    } else {
        document.getElementById("loginMessage").textContent = "Usuário ou senha inválidos. Por favor, tente novamente.";
    }
}

// Verifica em qual página estamos (login ou register)
const currentLocation = window.location.href;
if (currentLocation.includes("Tela-Regristo.html")) {
    // Página de registro
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = document.getElementById("RIDUsuario").value;
        const email = document.getElementById("RIDEmail").value;
        const password = document.getElementById("RIDPassword").value;



        // Salva o novo usuário
        saveUser(username, password,email);

        // Limpa o formulário após o registro
        document.getElementById("registerForm").reset();
    });
} else {
    // Página de login
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = document.getElementById("IDUsuario").value;
        const password = document.getElementById("IDPassword").value;
        
        // Realiza a validação do login
        loginUser(username, password);

        // Limpa o formulário após o login
        document.getElementById("loginForm").reset();
    });
}

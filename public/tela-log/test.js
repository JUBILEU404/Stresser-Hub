// test.js

// Função para realizar o login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('IDUsuario').value;
    const password = document.getElementById('IDPassword').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            // Armazene as informações do usuário no localStorage
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = "../deshbord/index.html"; // Redireciona para o dashboard após o login bem-sucedido
        } else {
            document.getElementById('loginMessage').textContent = result.error;
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        document.getElementById('loginMessage').textContent = 'Ocorreu um erro ao tentar fazer login';
    }
});

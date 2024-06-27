function confirmarSenha() {
    var Password = document.getElementById("IDPassword").value;
    var Password2 = document.getElementById("2IDPassword").value;
    
    if (Password === Password2) {
        alert("As senhas são iguais. Confirmação bem-sucedida!");
        return true;
    } else {
        alert("As senhas não são iguais. Por favor, tente novamente.");
        return false;
    }
}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Pessoa</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="tel"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Cadastro de Pessoa</h2>
    <form action="/submit_cadastro" method="POST">
        <label for="nome">Nome</label>
        <input type="text" id="nome" name="nome" required>
        
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        
        <label for="telefone">Telefone</label>
        <input type="tel" id="telefone" name="telefone" required>
        
        <label for="senha">Senha</label>
        <input type="password" id="senha" name="senha" required>
        
        <button type="submit">Cadastrar</button>
    </form>
</div>

</body>
</html>

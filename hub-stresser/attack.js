document.getElementById('attack-button').addEventListener('click', function() {
    const host = document.getElementById('host').value;
    const port = parseInt(document.getElementById('port').value);
    const time = parseInt(document.getElementById('time').value);
    const method = document.getElementById('method').value;

    axios.get(`http://localhost:3000/attack?host=${host}&port=${port}&time=${time}&method=${method}`)
        .then(response => {
            const responseData = response.data;
            document.getElementById('response').innerHTML = `
                <p><strong>Status:</strong> ${responseData.status}</p>
                <p><strong>Mensagem:</strong> ${responseData.message}</p>
            `;
            document.getElementById('response').style.display = 'block';
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('response').innerHTML = `<p>O ataque falhou. Verifique o console para mais detalhes.</p>`;
            document.getElementById('response').style.display = 'block';
        });
});

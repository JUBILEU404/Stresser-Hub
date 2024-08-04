document.addEventListener('DOMContentLoaded', function() {
    const attackButton = document.getElementById('attack-button');
    const protocolSelect = document.getElementById('protocol');
    const methodSelect = document.getElementById('method');
    const concurrentsRange = document.getElementById('concurrents');
    const concurrentValue = document.getElementById('concurrent-value');
    const alertContainer = document.getElementById('alert-container');
    const logEntries = document.getElementById('log-entries');

    const methods = {
        amplification: ['DNS', 'NTP', 'SNMP', 'SSDP'],
        Layer7: ['GET', 'POST', 'HEAD', 'SLOWLORIS']
    };

    protocolSelect.addEventListener('change', function() {
        const selectedProtocol = protocolSelect.value;
        const options = methods[selectedProtocol] || [];
        
        methodSelect.innerHTML = '';
        options.forEach(function(method) {
            const option = document.createElement('option');
            option.value = method;
            option.textContent = method;
            methodSelect.appendChild(option);
        });
    });

    // Trigger the change event to populate the methods for the default selected protocol
    protocolSelect.dispatchEvent(new Event('change'));

    attackButton.addEventListener('click', async function() {
        const host = document.getElementById('host').value;
        const port = document.getElementById('port').value;
        const time = document.getElementById('time').value;
        const method = document.getElementById('method').value;
        const concurrents = concurrentsRange.value;
        const userId = JSON.parse(localStorage.getItem('user')).id;

        if (!host || !port || !time || !method) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await axios.get('/api/attack', {
                params: {
                    host,
                    port,
                    time,
                    method,
                    userId,
                    concurrents
                }
            });

            if (response.status === 200) {
                document.getElementById('response').textContent = JSON.stringify(response.data, null, 2);
                addLogEntry(host, port, method, 'Success');
            } else {
                showAlert(response.data.error);
                document.getElementById('response').textContent = response.data.error;
                addLogEntry(host, port, method, 'Failed');
            }
        } catch (error) {
            showAlert('Erro ao realizar ataque: ' + error.message);
            document.getElementById('response').textContent = 'Erro ao realizar ataque: ' + error.message;
            addLogEntry(host, port, method, 'Failed');
        }
    });

    concurrentsRange.addEventListener('input', function() {
        concurrentValue.textContent = `${this.value} / 15`;
    });

    function showAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.textContent = message;
        alertContainer.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    function addLogEntry(target, port, method, status) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${target}</td>
            <td>${port}</td>
            <td>${method}</td>
            <td>${status}</td>
        `;
        logEntries.appendChild(row);
    }
});

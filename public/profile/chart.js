document.addEventListener('DOMContentLoaded', async function() {
    const ctx = document.getElementById('chart-container').getContext('2d');
    try {
        const response = await axios.get('/api/attacks');
        const attackData = response.data;
        const labels = attackData.map(attack => new Date(attack.created_at).toLocaleDateString());
        const data = attackData.map(attack => attack.response.length);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Attacks',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Erro ao carregar dados de ataques:', error);
    }
});

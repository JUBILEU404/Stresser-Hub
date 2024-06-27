document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('chart-container').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024-06-19', '2024-06-20', '2024-06-21', '2024-06-22', '2024-06-23', '2024-06-24', '2024-06-25'],
            datasets: [{
                label: 'count',
                data: [0, 120000, 160000, 120000, 80000, 40000, 0],
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
});

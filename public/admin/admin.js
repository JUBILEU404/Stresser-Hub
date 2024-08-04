document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await axios.get('/api/users');
        const users = response.data;
        const userList = document.getElementById('user-list');

        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                <p>ID: ${user.id}</p>
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>Plano: ${user.plan}</p>
                <p>Concurrents: ${user.concurrents}</p>
                <p>Data de Expiração: ${user.expiry_date}</p>
                <button class="btn btn-secondary" onclick="editUser(${user.id})">Editar</button>
            `;
            userList.appendChild(userItem);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
});

async function editUser(id) {
    try {
        const response = await axios.get(`/api/user/${id}`);
        const user = response.data;

        document.getElementById('user-id').value = user.id;
        document.getElementById('plan').value = user.plan;
        document.getElementById('concurrents').value = user.concurrents;
        document.getElementById('expiry_date').value = user.expiry_date;
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
    }
}

document.getElementById('update-user-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id = document.getElementById('user-id').value;
    const plan = document.getElementById('plan').value;
    const concurrents = document.getElementById('concurrents').value;
    const expiry_date = document.getElementById('expiry_date').value;

    try {
        const response = await axios.post('/api/admin/updateUser', { id, plan, concurrents, expiry_date });
        alert(response.data.message);
        location.reload();
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        alert('Erro ao atualizar usuário.');
    }
});

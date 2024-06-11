document.getElementById('theme-toggle').addEventListener('click', function() {
    document.querySelector('.dropdown-menu').classList.toggle('show');
});

function setTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    switch(theme) {
        case 'light':
            document.body.classList.add('light-theme');
            break;
        case 'dark':
            document.body.classList.add('dark-theme');
            break;
        case 'system':
            // Optionally, implement system theme detection logic
            break;
    }
    // Update the button text to reflect the current theme
    document.getElementById('theme-toggle').textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
}
window.onload = function() {
    setTheme('light');
};
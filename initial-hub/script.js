/* document.getElementById('theme-toggle').addEventListener('click', function() {
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
*/
 // faz a mudacasao do tema clado para escuro a traves de um clice 
 function toggleTheme() {
    var body = document.body;
    var themeButton = document.getElementById('theme-toggle');

    if (body.classList.contains('light-theme')) {
        // Mudando de light para dark
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        
    } else {
        // Mudando de dark para light
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
       
    }
};


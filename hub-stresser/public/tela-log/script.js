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


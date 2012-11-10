requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js'
});

// Start the main app logic.
requirejs(['lib/jquery'],
function () {
    alert('All Ready!');
});
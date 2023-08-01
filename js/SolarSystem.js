document.addEventListener('DOMContentLoaded', function() {
    const planets = document.getElementsByClassName('planet');

    //console.log(planets);

    for(let i = 0;i<planets.length;i++){
        const planetW = planets[i].clientHeight;
        planets[i].style.width = planetW + 'px';
        planets[i].style.height = planetW + 'px';
    };
});
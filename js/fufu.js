var fufu = document.getElementById('fufu');

let move  = 0;

fufu.addEventListener('click', function () {
    move = (Math.random()-0.5);
    head();
})

function head() {
    anime({
        targets: fufu.getElementById('head'),
        keyframes: [
            { rotate: -3 + move },
            { rotate: 5 + move },
            { rotate: 0 + move },
        ],
        duration: 1000,
        easing: 'cubicBezier(0.365, 0.280, 0.290, 1.480)',
    });
    anime({
        targets: fufu.getElementById('hair_l'),
        keyframes: [
            { rotate: 1 - move },
            { rotate: -3+ move },
            { rotate: -1 + move },
        ],
        duration: 1250,
        delay: 100,
        easing: 'easeInOutQuad',
    });
    anime({
        targets: fufu.getElementById('hair_r'),
        keyframes: [
            { rotate: 3 + move },
            { rotate: -1.5 - move },
            { rotate: 0 + move },
        ],
        duration: 1200,
        delay: 100,
        easing: 'easeInOutQuad',
    });
}
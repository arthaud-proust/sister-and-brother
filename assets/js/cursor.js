const cursorEl = document.getElementById('cursor');
const speed = 0.5;

function moveCursorTo(x, y, instant = false) {
    gsap.to(cursorEl, instant ? 0 : 0.4, {
        x,
        y
    });
}

function showCursor() {
    gsap.to(cursorEl, 0.4, {
        scale: 1
    });
}

function hideCursor() {
    gsap.to(cursorEl, 0.4, {
        scale: 0
    });
}

window.addEventListener('mousemove', (e) => {
    moveCursorTo(e.clientX, e.clientY)
})

document.addEventListener('mouseenter', (e) => {
    moveCursorTo(e.clientX, e.clientY, true)
    showCursor()
})

document.addEventListener('mouseleave', (e) => {
    hideCursor()
})

gsap.utils.toArray('.image').forEach(img => {
    img.addEventListener('mousemove', (e) => {
        hideCursor()
    })

    img.addEventListener('mouseleave', (e) => {
        showCursor()
    })
})

gsap.utils.toArray('a').forEach(a => {
    a.addEventListener('mousemove', (e) => {
        hideCursor()
    })

    a.addEventListener('mouseleave', (e) => {
        showCursor()
    })
})
class Cursor {
    el;
    speed

    constructor(el, speed) {
        this.el = el
        this.speed = speed
    }

    hide() {
        gsap.to(this.el, 0.4, {
            opacity: 0
        });
    }

    show() {
        gsap.to(this.el, 0.4, {
            opacity: 1
        });
    }

    moveTo(x, y, instant = false) {
        gsap.to(this.el, instant ? 0 : this.speed, {
            x,
            y
        });
    }

}

class CursorList {
    cursors = [];

    addCursor(cursor) {
        this.cursors.push(cursor)

        return this;
    }

    moveAllTo(x, y, instant) {
        this.cursors.forEach(cursor => {
            cursor.moveTo(x, y, instant)
        })
    }

    hideAll() {
        this.cursors.forEach(cursor => {
            cursor.hide()
        })
    }

    showAll() {
        this.cursors.forEach(cursor => {
            cursor.show()
        })
    }

    toAll(callback) {
        this.cursors.forEach(callback)
    }

    registerEvents() {
        document.addEventListener('click', (e) => {
            this.toAll(cursor => gsap.to(cursor.el, 0.4, {
                rotate: "+=45deg"
            }))
        })
        document.addEventListener('mousemove', (e) => {
            this.moveAllTo(e.clientX, e.clientY)
        })

        document.addEventListener('mouseenter', (e) => {
            this.moveAllTo(e.clientX, e.clientY, true)
            this.showAll()
        })

        document.addEventListener('mouseleave', (e) => {
            this.hideAll()
        })


        gsap.utils.toArray('a').forEach(img => {
            img.addEventListener('mouseenter', (e) => {
                this.hideAll()
            })

            img.addEventListener('mouseleave', (e) => {
                this.showAll()
            })
        })

    }
}

const cursorList = new CursorList();
cursorList.addCursor(new Cursor(document.getElementById('cursor1'), 0.5))
cursorList.addCursor(new Cursor(document.getElementById('cursor2'), 0.2))
cursorList.registerEvents()





gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let isFirstStop = true;
let isScrolling = true
const smoother = ScrollSmoother.create({
    smooth: 1.5,               // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true,           // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0,
    normalizeScroll: true,
    onUpdate: (scroller) => {
        if (isScrolling) {
            return
        }

        isScrolling = true;
        hideScrollHint();
    },
    onStop: (scroller) => {
        if (isFirstStop) {
            isFirstStop = false;
            hideScrollHint();
            return
        }

        if (!isScrolling) {
            return
        }

        if (scroller.progress > 0.95) {
            return
        }

        isScrolling = false;
        showScrollHint()
    },
    // ignoreMobileResize: true,
});

function showScrollHint(delay = 0) {
    gsap.fromTo(
        document.getElementById('scrollHint'),
        {opacity: 0},
        {
            opacity: 1,
            duration: 1,
            delay,
        })
}

function hideScrollHint(delay = 0) {
    gsap.fromTo(
        document.getElementById('scrollHint'),
        {opacity: 1},
        {
            opacity: 0,
            duration: 1,
            delay,
        })
}

function showText(el, params) {
    gsap.fromTo(el,
        {
            opacity: 0,
            y: 200,
            rotate: 40,
        },
        {
            opacity: 1,
            y: 0,
            rotate: 0,
            delay: 0.7,
            duration: 0.6,
            ease: Power2.easeOut,
            ...params
        }
    )
}

const isTouch = 'ontouchstart' in document.documentElement

window.addEventListener("load", () => {
    const totalScroll = document.body.scrollHeight - innerHeight;

    const loader = document.querySelector('#load');

    showText(
        loader.querySelector('h2'),
        {
            onComplete: () => showScrollHint(0.5)
        }
    )

    gsap.to(loader, {
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: loader,
        },
        opacity: 0,
    })


    gsap.to(".intro-text", {
        scrollTrigger: {
            scrub: 1,
            trigger: ".intro",
            start: "5% center",
            end: "25% center",
        },
        opacity: 1,
        ease: "none",
    })
    gsap.to(".floating-image img", {
        scrollTrigger: {
            scrub: 1,
            trigger: ".intro",
        },
        scale: (i, target) => target.dataset.grow || 1.4,
        ease: "none"
    })

    const tlZoom = gsap.timeline({
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 2,
            trigger: ".zoom",
            end: "250% top",
        },
    }).from(".zoom > h2", {
        opacity: 0,
        ease: "sine.out"
    }).from(".zoom > div", {
        scale: 1.3,
        autoAlpha: 0,
        ease: "sine.out"
    })

    const BFimages = gsap.utils.toArray('.beforeAfter');
    BFimages.forEach(BFimage => {
        gsap.timeline({
            scrollTrigger: {
                scrub: 1,
                start: 'top center',
                end: 'bottom center',
                trigger: BFimage
            },
        }).to(BFimage.querySelector('.after'), {
            opacity: 1,
            ease: "none"
        }).to(BFimage.querySelector('.before'), {
            opacity: 0,
            ease: "none"
        });
    });

    const tlOutro = gsap.timeline({
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 4,
            trigger: ".outro",
        }
    }).to(".outro-inner", {
        opacity: 1,
        ease: "none"
    });
});

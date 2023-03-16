gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let isFirstStop = true;
let isScrolling = true
const smoother = ScrollSmoother.create({
    smooth: 1.5,               // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true,           // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0,
    normalizeScroll: true,
    onUpdate: () => {
        if (isScrolling) {
            return
        }

        isScrolling = true;
        hideScrollHint();
    },
    onStop: (e) => {
        if (isFirstStop) {
            isFirstStop = false;
            hideScrollHint();
            return
        }
        if (!isScrolling) {
            return
        }

        isScrolling = false;
        showScrollHint()
    },
    // ignoreMobileResize: true,
});

function showScrollHint() {
    gsap.fromTo(
        document.getElementById('scrollHint'),
        {opacity: 0},
        {
            opacity: 1,
            duration: 1
        })
}

function hideScrollHint() {
    gsap.fromTo(
        document.getElementById('scrollHint'),
        {opacity: 1},
        {
            opacity: 0,
            duration: 1
        })
}

const isTouch = 'ontouchstart' in document.documentElement

window.addEventListener("load", () => {
    const totalScroll = document.body.scrollHeight - innerHeight;

    const loader = document.querySelector('#load');
    gsap.to(loader.querySelector('h2'), {
        delay: 0.5,
        opacity: 1,
        duration: 1,
        onComplete: showScrollHint
    })

    gsap.to(loader, {
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: loader
        },
        opacity: 0,
    })


    const tlIntro = gsap.timeline({
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: ".intro"
        }
    }).to(".floating-image", {
        y: (i, target) => -totalScroll * target.dataset.s,
        scale: (i, target) => target.dataset.grow || 1,
        ease: "none"
    }).to(".intro-text", {
        opacity: -0.6,
        ease: "none"
    });

    const tlZoom = gsap.timeline({
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 2,
            trigger: ".zoom"
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

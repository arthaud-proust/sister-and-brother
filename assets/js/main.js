gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
    smooth: 1.5,               // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true,           // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0,
    normalizeScroll: true,
    // ignoreMobileResize: true,
});

const isTouch = 'ontouchstart' in document.documentElement

window.addEventListener("load", () => {
    smoother.paused(true)

    const loader = document.querySelector('#load');
    gsap.to(loader.querySelector('h2'), {
        delay: 0.5,
        opacity: 0,
        duration: 0.5
    })
    gsap.to(loader, {
        delay: 1.3,
        y: () => `-=${loader.offsetHeight}`,
        duration: 0.6,
        ease: "sine.out",
        onComplete: () => {
            smoother.paused(false)
        }
    })

    const totalScroll = document.body.scrollHeight - innerHeight;

    const tlIntro = gsap.timeline({
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: ".intro"
        }
    });
    tlIntro.to(".floating-image", {
        y: (i, target) => -totalScroll * target.dataset.s,
        scale: (i, target) => target.dataset.grow || 1,
        ease: "none"
    });

    tlIntro.to(".intro-text", {
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

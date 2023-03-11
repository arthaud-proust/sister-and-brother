gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
    smooth: 1.5,               // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true,           // looks for data-speed and data-lag attributes on elements
});

const isTouch = 'ontouchstart' in document.documentElement

window.addEventListener("load", () => {
    const totalScroll = document.body.scrollHeight - innerHeight;

    gsap.to(".floating-image", {
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: ".intro",
        },
        y: (i, target) => -totalScroll * target.dataset.s,
        ease: "none"
    });

    gsap.from(".zoom > *", {
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 2,
            trigger: ".zoom"
        },
        scale: 1.3,
        autoAlpha: 0,
        ease: "sine.out"
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: ".test"
        },
    })
    tl.to(".test .after", {
        opacity: 1,
        ease: "none"
    });
    tl.to(".test .before", {
        opacity: 0,
        ease: "none"
    });

    const tl2 = gsap.timeline({
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: ".test2"
        },
    })
    tl2.to(".test2 .after", {
        opacity: 1,
        ease: "none"
    });
    tl2.to(".test2 .before", {
        opacity: 0,
        ease: "none"
    });

    const tl3 = gsap.timeline({
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: ".test3"
        },
    })
    tl3.to(".test3 .after", {
        opacity: 1,
        ease: "none"
    });
    tl3.to(".test3 .before", {
        opacity: 0,
        ease: "none"
    });
});

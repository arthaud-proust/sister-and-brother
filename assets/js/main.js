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
        scale: (i, target) => target.dataset.grow || 1,
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

    addTriggerForPhotoSection('.test1');
    addTriggerForPhotoSection('.test2');
    addTriggerForPhotoSection('.test3');
    addTriggerForPhotoSection('.test4');
    addTriggerForPhotoSection('.test5');
});

function addTriggerForPhotoSection(className) {
    const tl = gsap.timeline({
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: className
        },
    })
    tl.to(className +" .after", {
        opacity: 1,
        ease: "none"
    });
    tl.to(className+" .before", {
        opacity: 0,
        ease: "none"
    });
}

gsap.registerPlugin(ScrollTrigger);

const isTouch = 'ontouchstart' in document.documentElement

window.addEventListener("load", () => {
    const totalScroll = document.body.scrollHeight - innerHeight;

    gsap.to(".floating-image", {
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 1,
            trigger: ".intro"
        },
        y: (i, target) => -totalScroll * target.dataset.speed,
        ease: "none"
    });

    gsap.from(".test > *", {
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: 2,
            trigger: ".test"
        },
        scale: 1.3,
        autoAlpha: 0,
        ease: "sine.out"
    });
});

gsap.registerPlugin(ScrollTrigger);

const isTouch = 'ontouchstart' in document.documentElement

window.addEventListener("load", () => {
    // const totalScroll = asscroll.containerElement.scrollHeight - innerHeight;

    // gsap.to(".peach", {
    //     scrollTrigger: {
    //         pin: true,
    //         pinType: isTouch ? 'fixed' : 'transform',
    //         end: '200%',
    //         scrub: 0.2,
    //         trigger: ".peaches"
    //     },
    //     y: (i, target) => -totalScroll * target.dataset.speed,
    //     ease: "none"
    // });

    gsap.from(".test img", {
        scrollTrigger: {
            pin: true,
            pinType: isTouch ? 'fixed' : 'transform',
            scrub: true,
            trigger: ".test"
        },
        scale: 0.2,
        autoAlpha: 0,
        ease: "sine.out"
    });
});

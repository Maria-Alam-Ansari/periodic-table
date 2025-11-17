//loader code
var timeLine = gsap.timeline();
timeLine.from("#loader h3", {
  x: 20,
  duration: 1,
  opacity: 0,
});

timeLine.to("#loader h3", {
  x: -20,
  opacity: 0,
});

timeLine.to("#loader", {
  opacity: 0,
});

timeLine.to("#loader", {
  display: "none",
});

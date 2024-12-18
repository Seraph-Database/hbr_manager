<template>
  <div class="gradient-blur">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
.gradient-blur {
  position: fixed;
  background: linear-gradient(to bottom, #31294200 0%, #312942aa 50%);
  z-index: 5;
  inset: auto 0 0 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.gradient-blur > div,
.gradient-blur::before,
.gradient-blur::after {
  position: absolute;
  inset: 0;
}
.gradient-blur::before {
  content: "";
  z-index: 1;
  backdrop-filter: blur(0.0625rem);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 12.5%,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 0, 0, 0) 37.5%
  );
}
.gradient-blur > div:nth-of-type(1) {
  z-index: 2;
  backdrop-filter: blur(0.125rem);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 12.5%,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 0, 0, 1) 37.5%,
    rgba(0, 0, 0, 0) 50%
  );
}
.gradient-blur > div:nth-of-type(2) {
  z-index: 3;
  backdrop-filter: blur(0.1875rem);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 1) 37.5%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 62.5%
  );
}
.gradient-blur > div:nth-of-type(3) {
  z-index: 4;
  backdrop-filter: blur(0.25rem);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 37.5%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1) 62.5%,
    rgba(0, 0, 0, 0) 75%
  );
}
.gradient-blur > div:nth-of-type(4) {
  z-index: 5;
  backdrop-filter: blur(0.3125rem);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1) 62.5%,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 87.5%
  );
}
.gradient-blur > div:nth-of-type(5) {
  z-index: 6;
  backdrop-filter: blur(0.375rem);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 62.5%,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 1) 87.5%,
    rgba(0, 0, 0, 0) 100%
  );
}
.gradient-blur > div:nth-of-type(6) {
  z-index: 7;
  backdrop-filter: blur(0.4375rem);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 1) 87.5%,
    rgba(0, 0, 0, 1) 100%
  );
}
.gradient-blur::after {
  content: "";
  z-index: 8;
  backdrop-filter: blur(0.5rem);
  mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 87.5%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>

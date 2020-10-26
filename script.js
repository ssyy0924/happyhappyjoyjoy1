const fishImages = [
  "https://cdn-ak.f.st-hatena.com/images/fotolife/d/dala/20180713/20180713230831.png",
  "https://cdn-ak.f.st-hatena.com/images/fotolife/d/dala/20180713/20180713230843.png",
  "https://cdn-ak.f.st-hatena.com/images/fotolife/d/dala/20180713/20180713230849.png",
  "https://cdn-ak.f.st-hatena.com/images/fotolife/d/dala/20180713/20180713230855.png",
  "https://cdn-ak.f.st-hatena.com/images/fotolife/d/dala/20180713/20180713230904.png"
];

new Vue({
  el: "#app",
  data() {
    return {
      rotationX: 0.0,
      rotationY: 0.0,
      fishes: [this.generateFish(), this.generateFish()]
    }
  },
  computed: {
    rotation() {
      return {
        transform: `perspective(1000px) rotateY(${this.rotationX}deg) rotateX(${this.rotationY}deg)`
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.fishes.forEach(fish => this.moveFish(fish));
    }, 41);
  },
  methods: {
    onMouseMoved(e) {
      console.log(e);
      const maxRotation = 20.0;
      const x = (e.pageX / document.body.clientWidth) * 2 - 1;
      const y = (e.pageY / document.body.clientHeight) * 2 - 1;
      this.rotationX = maxRotation * x;
      this.rotationY = -maxRotation * y;
    },
    generateFish() {
      return {
        image: fishImages[Math.floor(Math.random() * fishImages.length)],
        x: Math.floor(50 + Math.random() * 200),
        y: -50 + Math.floor(Math.random() * 100),
        z: -100 + Math.floor(Math.random() * 200),
        ax: Math.floor(Math.random() * 2) == 0 ? -1 : 1
      }
    },
    fishStyle(fish) {
      const flip = fish.ax < 0 ? '1' : '-1';
      return {
        left: `${fish.x}px`,
        transform: `scaleX(${flip}) translateY(${fish.y}px) translateZ(${fish.z}px)`
      };
    },
    moveFish(fish) {
      if (fish.ax < 0) {
        if (fish.x <= 30) {
          fish.ax = -fish.ax;
        }
      } else {
        if (fish.x >= 300) {
          fish.ax = -fish.ax;
        }
      }
      fish.x += fish.ax;
    }
  }
});
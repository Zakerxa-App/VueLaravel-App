<template>
    <div class="overlay"></div>
    <div class="network-mesh-wire">
        <canvas id="canvas" :style="{'z-index': index}"></canvas>
        <slot />
    </div>
</template>
<script>
export default {
    props:['index'],
    mounted() {
        let particle = 130;
        let display = this.$vuetify.display.width;
        if (display >= 1200) particle = 125
        else if (display >= 1000 && display < 1200) particle = 120
        else if (display >= 922 && display < 1000) particle = 110
        else if (display >= 786 && display < 992) particle = 100
        else if (display >= 576 && display < 786) particle = 100
        else if (display >= 390 && display < 576) particle = 90
        else particle = 80;



        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let particleCount = particle;
        let particleDistance = particle;
        let color = '#fff';
        let staticAnimationInterval;

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseout', handleMouseOut);

        function init() {
            resizeCanvas();
            createParticles();
            loop();
            staticAnimationInterval = setInterval(staticAnimation, 4000);
            handleMouseMove();
            handleMouseOut();
        }

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function createParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: Math.random() * 2 - 1,
                    vy: Math.random() * 2 - 1
                });
            }
        }

        function loop() {
            requestAnimationFrame(loop);
            updateParticles();
            drawParticles();
        }

        function updateParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles[i].x += particles[i].vx;
                particles[i].y += particles[i].vy;
                if (particles[i].x < 0 || particles[i].x > width) {
                    particles[i].vx *= -1;
                }
                if (particles[i].y < 0 || particles[i].y > height) {
                    particles[i].vy *= -1;
                }
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < particleDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = color;
                        ctx.lineWidth = (1 - distance / particleDistance) * 2;
                        ctx.stroke();
                    }
                }
            }
        }

        function staticAnimation() {
            for (let i = 0; i < particleCount; i++) {
                particles[i].vx = Math.random() * 2 - 1;
                particles[i].vy = Math.random() * 2 - 1;
            }
        }

        function handleMouseMove(e) {
            if (e) {
                // console.log(e.clientX)
                let mouseX = e.clientX;
                let mouseY = e.clientY;
                for (let i = 0; i < particleCount; i++) {
                    let dx = particles[i].x - mouseX;
                    let dy = particles[i].y - mouseY;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < particleDistance * 2) {
                        particles[i].vx += dx * 0.0003;
                        particles[i].vy += dy * 0.0003;
                    }
                }
            }

        }

        function handleMouseOut() {
            for (let i = 0; i < particleCount; i++) {
                particles[i].vx = Math.random() * 2 - 1;
                particles[i].vy = Math.random() * 2 - 1;
            }
        }

        init();
    }
}
</script>

<style>
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.35);
}

.network-mesh-wire {
    position: relative;
    width: 100%;
    height: 100vh;
}

#canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

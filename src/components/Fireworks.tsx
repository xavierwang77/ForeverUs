import { useEffect, useRef } from 'react';

type Particle = {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    life: number;
};

const Fireworks = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // 初始设置 canvas 尺寸
        resizeCanvas();

        let particles: Particle[] = [];

        const createParticles = (x: number, y: number) => {
            const particleCount = 100; // 粒子数量
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.random() * 360 * Math.PI) / 180; // 随机角度
                const speed = Math.random() * 5 + 1; // 随机速度
                particles.push({
                    x,
                    y,
                    size: Math.random() * 3 + 1, // 粒子大小
                    speedX: Math.cos(angle) * speed, // 水平方向速度
                    speedY: Math.sin(angle) * speed, // 垂直方向速度
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`, // 随机颜色
                    life: Math.random() * 100 + 100, // 生命时长
                });
            }
        };

        const updateParticles = () => {
            particles = particles.filter((p) => p.life > 0);
            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.size *= 0.96; // 粒子逐渐缩小
                p.life -= 2; // 逐渐减少粒子的寿命
            });
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
        };

        const animate = () => {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        };

        const handleClick = (e: MouseEvent) => {
            createParticles(e.clientX, e.clientY);
        };

        // 添加事件监听器
        canvas.addEventListener('click', handleClick);
        window.addEventListener('resize', resizeCanvas); // 监听窗口大小变化

        animate();

        return () => {
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('resize', resizeCanvas); // 移除事件监听器
        };
    }, []);

    return <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', top: 0, left: 0 }} />;
};

export default Fireworks;

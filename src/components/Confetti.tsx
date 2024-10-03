import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiComponent = () => {
    useEffect(() => {
        // 目标日期为 2024-10-26 00:00:00
        const targetDate = new Date('2024-10-26T00:00:00');

        // 获取当前时间
        const now = new Date();

        // 计算目标时间与当前时间的时间差（毫秒）
        const timeDifference = targetDate.getTime() - now.getTime();

        console.log(timeDifference);

        // 如果目标时间在未来，设置一个定时器
        if (timeDifference > 0) {
            const timer = setTimeout(() => {
                launchConfetti();
            }, timeDifference);

            return () => clearTimeout(timer); // 清除定时器
        }
    }, []);

    const launchConfetti = () => {
        const duration = 5 * 1000; // 持续时间5秒
        const end = Date.now() + duration;

        const colors = ['#bb0000', '#ffffff', '#00ff00', '#0000ff', '#ffbb00', '#ff00ff'];

        (function frame() {
            confetti({
                particleCount: 2, // 每次喷射的粒子数量
                angle: 60,
                spread: 55,
                origin: { x: 0 , y: 0.85}, // 从左侧喷射
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 , y: 0.85}, // 从右侧喷射
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame); // 继续动画
            }
        })();
    };

    return <></>; // 组件不需要渲染内容，动画在 useEffect 中触发
};

export default ConfettiComponent;

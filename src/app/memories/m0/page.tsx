import React from 'react';
import MemoryCard from '@/components/MemoryCard';

export default function MemoriesPage () {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">我们的美好回忆</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MemoryCard
                    imageUrl="/images/memory1.jpg"
                    title="第一次旅行"
                    description="我们一起度过了愉快的时光，享受着阳光与大海。"
                    date="2019年7月"
                />
                <MemoryCard
                    imageUrl="/images/memory2.jpg"
                    title="婚礼盛典"
                    description="那一天，我们在众人见证下许下永恒的誓言。"
                    date="2020年10月"
                />
                <MemoryCard
                    imageUrl="/images/memory3.jpg"
                    title="新年庆祝"
                    description="迎接新年的钟声，我们在烟火中许下新的愿望。"
                    date="2021年1月"
                />
                {/* 可以添加更多回忆卡片 */}
                <MemoryCard
                    imageUrl="/images/memory1.jpg"
                    title="第一次旅行"
                    description="我们一起度过了愉快的时光，享受着阳光与大海。"
                    date="2019年7月"
                />
                <MemoryCard
                    imageUrl="/images/memory2.jpg"
                    title="婚礼盛典"
                    description="那一天，我们在众人见证下许下永恒的誓言。"
                    date="2020年10月"
                />
                <MemoryCard
                    imageUrl="/images/memory3.jpg"
                    title="新年庆祝"
                    description="迎接新年的钟声，我们在烟火中许下新的愿望。"
                    date="2021年1月"
                />
            </div>


        </div>
    );
};

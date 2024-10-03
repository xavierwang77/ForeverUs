import React from 'react';
import Img from 'next/image'

type MemoryCardProps = {
    imageUrl: string;
    title: string;
    description: string;
    date?: string; // 可选的日期
};

const MemoryCard: React.FC<MemoryCardProps> = ({ imageUrl, title, description, date }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-6">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <Img className="h-48 w-full object-cover md:w-48" src={imageUrl} alt={title} width={50} height={50}/>
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{date}</div>
                    <h1 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</h1>
                    <p className="mt-2 text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default MemoryCard;

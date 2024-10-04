"use client";

import React from 'react';
import TimelinePage from '@/components/TimelinePage';
import memoriesData from '@/data/timeline.json';

interface Params {
    id: string;
}

export default function Page({ params }: { params: Params }) {
    const id = params.id;

    if (!id) {
        return <div>Loading...</div>;
    }

    // 查找匹配的页面数据
    const memory = memoriesData.find((item) => item.id === id);

    if (!memory) {
        return <div>Memory not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <TimelinePage
                title={memory.title}
                date={memory.date}
                description={memory.description}
                imageSrc={memory.imageSrc}
                imageAlt={memory.imageAlt}
                imageOnLeft={memory.imageOnLeft}
                buttonUrl={memory.buttonUrl}
                buttonText={memory.buttonText}
            />
        </div>
    );
}

import Image from 'next/image'
import React, {useEffect, useState } from 'react'
import Link from "next/link";
import {Button} from "@/components/ui/button";

type MemoryProps = {
    title: string
    date: string
    description: string
    imageSrc: string
    imageAlt: string
    imageOnLeft?: boolean
    buttonUrl: string
    buttonText?: string
}

export default function TimelinePage({
    title,
    date,
    description,
    imageSrc,
    imageAlt,
    imageOnLeft = true,
    buttonUrl,
    buttonText = '继续旅程'
}: MemoryProps) {
    const [isVideo, setIsVideo] = useState(false)

    // Check if the source is a video
    useEffect(() => {
        setIsVideo(imageSrc.endsWith('.mp4') || imageSrc.endsWith('.webm'))
    }, [imageSrc])

    const ImageOrVideo = () => (
        isVideo ? (
            <video
                className="w-full h-full object-cover rounded-lg shadow-lg"
                controls
                autoPlay
                muted
                loop
            >
                <source src={imageSrc} type={`video/${imageSrc.split('.').pop()}`} />
                Your browser does not support the video tag.
            </video>
        ) : (
            <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                className="w-full h-full object-cover rounded-lg shadow-lg"
            />
        )
    )

    const Content = () => (
        <div className="flex flex-col justify-center p-6 md:p-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-800">{title}</h2>
            <p className="text-lg text-gray-600 mb-4">{date}</p>
            <p className="text-gray-800 leading-relaxed">{description}</p>
        </div>
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <div className={`flex flex-col ${imageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                <div className="w-full md:w-1/2 h-[400px] md:h-[600px]">
                    <ImageOrVideo/>
                </div>
                <div className="w-full md:w-1/2">
                    <Content/>
                </div>
            </div>
            <div className="mt-16">
                <Link href={buttonUrl} passHref>
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold w-[17rem] h-18 py-4 px-8 rounded-full
                    text-3xl text-center transition-all duration-200 ease-in-out transform hover:scale-110 shadow-lg"
                    >
                        <span style={{letterSpacing: '0.8em', marginRight: '-0.8em'}}>{buttonText}</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
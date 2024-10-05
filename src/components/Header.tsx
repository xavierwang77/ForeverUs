import Link from "next/link"
import Image from "next/image"
import React from "react"
import MusicPlayer from "@/components/MusicPlay";
import Navigator from "@/components/Navigator";

export default function Header() {
    return (
        <header className="bg-primary text-primary-foreground py-2">
            <div className="container mx-auto max-w-full">
                <div className="grid grid-cols-3 items-center px-6">
                    {/* 左侧标题和Logo */}
                    <div className="flex items-center">
                        <Link href="/" passHref>
                            <h1 className="text-2xl font-bold">Forever Us</h1>
                        </Link>
                        <Image src="/header-icon.svg" alt="Header Icon" width={24} height={24}
                               className="ml-2 w-6 h-6"/>
                    </div>

                    {/* 中间的播放组件 */}
                    <div className="flex justify-center">
                        <MusicPlayer/>
                    </div>

                    {/* 右侧导航栏按钮 */}
                    <div className="flex justify-end">
                        <Navigator/>
                    </div>
                </div>
            </div>
        </header>
    )
}
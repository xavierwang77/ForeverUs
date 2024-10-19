"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import memories from '@/data/keepsake.json'

interface MemoryItem {
    id: number
    src: string
    alt: string
    description: string
}

interface LikesState {
    [key: number]: boolean
}

export default function Page() {
    const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null)
    const [isLiked, setIsLiked] = useState<LikesState>({}) // 标记照片是否被喜欢

    // 从 localStorage 读取喜欢状态
    useEffect(() => {
        const savedLikes = localStorage.getItem('likesList')
        if (savedLikes) {
            setIsLiked(JSON.parse(savedLikes))
        }
    }, [])

    // 更新 localStorage
    const handleLikeToggle = (id: number) => {
        const updatedLikes = { ...isLiked, [id]: !isLiked[id] }
        setIsLiked(updatedLikes)
        localStorage.setItem('likesList', JSON.stringify(updatedLikes))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-purple-800 mb-5">我们的爱情图鉴</h1>
            <div className="h-[75vh] overflow-y-auto relative pr-2 hide-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-0">
                    {memories.map((memory) => (
                        <motion.div
                            key={memory.id}
                            className="bg-white h-66 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedMemory(memory)}
                        >
                            <Image
                                src={memory.src}
                                alt={memory.alt}
                                width={300}
                                height={300}
                                className="w-full h-[22vh] object-cover"
                            />
                            <div className="p-4 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-purple-700 pl-1">{memory.alt}</h3>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()  // 阻止事件冒泡
                                        handleLikeToggle(memory.id)
                                    }}
                                    className="focus:outline-none"
                                >
                                    <Heart
                                        className={`w-5 h-5 mr-1 ${isLiked[memory.id] ? 'fill-pink-500 text-pink-500' : 'text-pink-500'}`}/>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {selectedMemory && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedMemory(null)}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-lg p-6 max-w-xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedMemory.src}
                            alt={selectedMemory.alt}
                            width={600}
                            height={600}
                            className="w-full h-96 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold text-purple-800 mb-2">{selectedMemory.alt}</h2>
                        <p className="text-gray-600">{selectedMemory.description}</p>
                        <button
                            className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-300"
                            onClick={() => setSelectedMemory(null)}
                        >
                            关闭
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}

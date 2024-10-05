'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward } from 'lucide-react'

interface Song {
    title: string
    src: string
}

const songs: Song[] = [
    { title: "最初的记忆", src: "/audio/最初的记忆.mp3" },
    { title: "爱不单行", src: "/audio/爱不单行.mp3" },
    { title: "特别的人", src: "/audio/特别的人.mp3" },
    { title: "深蓝", src: "/audio/深蓝.mp3" },
]

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)

    const audioRef = useRef<HTMLAudioElement>(null)

    // 当currentSong变化时，自动加载新歌并播放（如果是播放状态）
    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            const handleTimeUpdate = () => {
                if (!isSeeking) {
                    setCurrentTime(audio.currentTime)
                }
            }
            const handleMetadataLoaded = () => {
                setDuration(audio.duration || 0)
                setCurrentTime(audio.currentTime || 0)
            }
            const handleSongEnd = () => {
                playNext()  // 歌曲结束时自动播放下一首
            }

            // 监听元数据加载、播放进度和歌曲结束事件
            audio.addEventListener('timeupdate', handleTimeUpdate)
            audio.addEventListener('loadedmetadata', handleMetadataLoaded)
            audio.addEventListener('ended', handleSongEnd)

            // 当切换歌曲时，如果当前是播放状态，则自动播放新歌
            if (isPlaying) {
                audio.play().catch(err => console.log("播放失败:", err))
            }

            // 清理事件监听器
            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate)
                audio.removeEventListener('loadedmetadata', handleMetadataLoaded)
                audio.removeEventListener('ended', handleSongEnd)
            }
        }
    }, [currentSong, isPlaying, isSeeking])

    const togglePlay = () => {
        const audio = audioRef.current
        if (audio) {
            if (audio.readyState >= 1 && duration === 0) {
                setDuration(audio.duration || 0)
                setCurrentTime(audio.currentTime || 0)
            }
            if (isPlaying) {
                audio.pause()
            } else {
                audio.play().catch(err => console.log("播放失败:", err))
            }
            setIsPlaying(!isPlaying)
        }
    }

    const playNext = () => {
        setCurrentSong((prev) => (prev + 1) % songs.length)  // 循环播放
        setIsPlaying(true)  // 切歌后保持播放状态
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value)
        setCurrentTime(time)
        if (audioRef.current) {
            audioRef.current.currentTime = time
        }
    }

    const handleSeekStart = () => {
        setIsSeeking(true)
    }

    const handleSeekEndMouse = (e: React.MouseEvent<HTMLInputElement>) => {
        const time = parseFloat(e.currentTarget.value)
        setCurrentTime(time)
        if (audioRef.current) {
            audioRef.current.currentTime = time
        }
        setIsSeeking(false)
        if (audioRef.current && !isPlaying) {
            audioRef.current.play()
        }
    }

    const handleSeekEndTouch = (e: React.TouchEvent<HTMLInputElement>) => {
        const time = parseFloat(e.currentTarget.value)
        setCurrentTime(time)
        if (audioRef.current) {
            audioRef.current.currentTime = time
        }
        setIsSeeking(false)
        if (audioRef.current && !isPlaying) {
            audioRef.current.play()
        }
    }

    return (
        <div className="w-full max-w-md mx-auto bg-primary shadow-lg rounded-lg overflow-hidden">
            <div className="px-1">
                <audio ref={audioRef} src={songs[currentSong].src} />
                <div className="flex items-center justify-center space-x-2 mb-1">
                    <button
                        onClick={togglePlay}
                        className="bg-primary text-white p-2 rounded-full hover:bg-[rgb(56,56,56)] focus:outline-none focus:ring-opacity-50"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={18}/> : <Play size={18}/>}
                    </button>
                    <h2 className="text-2xl font-bold">{songs[currentSong].title}</h2>
                    <button
                        onClick={playNext}
                        className="bg-primary text-white p-2 rounded-full hover:bg-[rgb(56,56,56)] focus:outline-none focus:ring-opacity-50"
                        aria-label="Next song"
                    >
                        <SkipForward size={18}/>
                    </button>
                </div>
                <div className="h-3 flex justify-center">
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleProgressChange}
                        onMouseDown={handleSeekStart}
                        onMouseUp={handleSeekEndMouse}
                        onTouchStart={handleSeekStart}
                        onTouchEnd={handleSeekEndTouch}
                        className="w-full"
                        style={{ height: '6px', padding: '0', margin: '0', width: '80%' }}
                    />
                </div>
            </div>
        </div>
    )
}

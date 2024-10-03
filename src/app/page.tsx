"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

export default function Home() {
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const startDate = new Date('2023-10-26T00:00:00')

    const updateElapsedTime = () => {
      const now = new Date()
      const difference = now.getTime() - startDate.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeElapsed({ days, hours, minutes, seconds })
    }

    updateElapsedTime()
    const intervalId = setInterval(updateElapsedTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 p-4 text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-8">我们已经在一起...</h1>
        <div className="text-9xl font-bold text-pink-600 mb-4 drop-shadow-lg">
          {timeElapsed.days}
        </div>
        <div className="text-4xl font-semibold text-purple-700 mb-8">天</div>
        <div className="flex justify-center items-center space-x-4 text-4xl font-mono font-bold text-gray-800 mb-4">
          <span>{formatNumber(timeElapsed.hours)}</span>
          <span className="text-pink-500">:</span>
          <span>{formatNumber(timeElapsed.minutes)}</span>
          <span className="text-pink-500">:</span>
          <span>{formatNumber(timeElapsed.seconds)}</span>
        </div>
        <div className="flex justify-center items-center space-x-4 text-lg text-gray-700 mb-28">
          <span className="w-16 text-center">时</span>
          <span className="w-20 text-center">分</span>
          <span className="w-16 text-center">秒</span>
        </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold w-70 h-12 py-4 px-10 rounded-full text-2xl transition-all duration-200 ease-in-out transform hover:scale-110 shadow-lg">
              开启旅程
          </Button>
      </div>
  )
}
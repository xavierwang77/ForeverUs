"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">自2023年10月26日起已经过去</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center space-x-2 text-4xl font-mono font-bold text-primary">
              <span>{timeElapsed.days}</span>
              <span className="text-muted-foreground">:</span>
              <span>{formatNumber(timeElapsed.hours)}</span>
              <span className="text-muted-foreground">:</span>
              <span>{formatNumber(timeElapsed.minutes)}</span>
              <span className="text-muted-foreground">:</span>
              <span>{formatNumber(timeElapsed.seconds)}</span>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-2 text-sm text-muted-foreground">
              <span className="w-16 text-center">天</span>
              <span className="w-16 text-center">时</span>
              <span className="w-16 text-center">分</span>
              <span className="w-16 text-center">秒</span>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
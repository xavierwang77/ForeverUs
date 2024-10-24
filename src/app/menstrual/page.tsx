"use client"

import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart, LinearScale, PointElement, LineElement, Legend } from 'chart.js';

// 设置本地化
moment.locale('zh-cn')

// 注册 Chart.js 的分类轴
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Legend);

const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom' as 'top' | 'bottom' | 'left' | 'right' | 'chartArea',
        },
    }
}

// 经期记录表单组件
const PeriodForm = ({ addPeriod }) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (startDate && endDate) {
            addPeriod({ start: new Date(startDate), end: new Date(endDate) })
            setStartDate('')
            setEndDate('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="开始日期"
                />
                <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="结束日期"
                />
            </div>
            <Button type="submit" className="ml-2">记录经期</Button>
        </form>
    )
}

const PeriodChart = ({ periods }) => {
    const cycleDays = periods.map((period, i) =>
        i === 0 ? null : (period.start - periods[i - 1].start) / (1000 * 60 * 60 * 24));

    const data = {
        labels: periods.map(period => period.start.toLocaleDateString()),
        datasets: [
            {
                label: '单次月经周期',
                data: periods.map(period => (period.end - period.start) / (1000 * 60 * 60 * 24)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '月经间隔时间',
                data: cycleDays,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
            </CardHeader>
            <CardContent className="h-[37vh]">
                <Line data={data} options={chartOptions} />
            </CardContent>
        </Card>
    )
}

// 周期统计和健康状况评估组件
const PeriodStats = ({periods}) => {
    const calculateAverageCycle = () => {
        if (periods.length < 2) return '需要更多数据';

        // 排序以确保日期顺序正确
        periods.sort((a, b) => a.start.getTime() - b.start.getTime());

        let totalDays = 0;
        for (let i = 1; i < periods.length; i++) {
            const start1 = periods[i - 1].start.getTime();
            const start2 = periods[i].start.getTime();
            totalDays += (start2 - start1) / (1000 * 60 * 60 * 24); // 将时间差转换为天数
        }

        return Math.round(totalDays / (periods.length - 1));
    };

    const averageCycle = calculateAverageCycle()
    const lastPeriod = periods[periods.length - 1]
    let encourageTextHead = ''
    let encourageTextEnd = ''

    const getHealthStatus = () => {
        if (typeof averageCycle === 'number') {
            if (averageCycle >= 21 && averageCycle <= 35) {
                encourageTextHead = '宝宝很健康'
                encourageTextEnd = '继续保持哟'
                return '正常'
            } else if (averageCycle < 21) {
                encourageTextHead = '宝宝要多休息'
                encourageTextEnd = '保持好心情哟'
                return '周期偏短'
            } else {
                encourageTextHead = '宝宝要多运动'
                encourageTextEnd = '保持好心情哟'
                return '周期偏长'
            }
        }
        return '需要更多数据来评估'
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>经期统计</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
                {/* 左侧信息区域 */}
                <div className="flex-1 space-y-2">
                    <div className="p-1.5 bg-gray-100 rounded-md">
                        <p>平均周期: {averageCycle} 天</p>
                    </div>
                    <div className="p-1.5 bg-gray-100 rounded-md">
                        <p>上次经期: {lastPeriod ? moment(lastPeriod.start).format('YYYY-MM-DD') : '无数据'}</p>
                    </div>
                    <div className="p-1.5 bg-gray-100 rounded-md">
                        <p>健康状况: {getHealthStatus()}</p>
                    </div>
                </div>

                {/* 右侧鼓励语区域 */}
                <div className="flex-1 p-4 bg-gray-100 rounded-md justify-between space-y-2">
                    <p className="font-bold text-4xl text-center">{encourageTextHead}</p>
                    <p className="font-bold text-4xl text-center">{encourageTextEnd}</p>
                </div>
            </CardContent>
        </Card>
    )
}

// 主组件
export default function PeriodTracker() {
    const [periods, setPeriods] = useState([
        {start: new Date(2023, 10, 26), end: new Date(2023, 11, 4)},
        {start: new Date(2024, 0, 12), end: new Date(2024, 0, 20)},
        {start: new Date(2024, 2, 13), end: new Date(2024, 2, 20)},
        {start: new Date(2024, 3, 27), end: new Date(2024, 4, 2)},
        {start: new Date(2024, 5, 13), end: new Date(2024, 5, 21)},
        {start: new Date(2024, 7, 4), end: new Date(2024, 7, 18)},
        {start: new Date(2024, 7, 28), end: new Date(2024, 8, 7)},
        {start: new Date(2024, 9, 3), end: new Date(2024, 9, 15)},
    ])

    const addPeriod = (newPeriod) => {
        setPeriods([...periods, newPeriod])
    }

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-6 w-full h-full mt-20">
            {/*<div className="flex justify-center">*/}
            {/*    <PeriodForm addPeriod={addPeriod}/>*/}
            {/*</div>*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-full">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>经期日历</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="">
                                <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    initialView="dayGridMonth"
                                    events={periods.map(period => ({
                                        title: '月经周期',
                                        start: period.start,
                                        end: period.end,
                                        backgroundColor: '#FFC0CB',
                                        borderColor: 'transparent',
                                        textColor: 'black',
                                    }))}
                                    headerToolbar={{
                                        left: '',
                                        center: 'title',
                                        right: ''
                                    }}
                                    footerToolbar={{
                                        left: '',
                                        center: 'prev today next',
                                        right: ''
                                    }}
                                    displayEventTime={false}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <PeriodStats periods={periods}/>
                    </div>
                    <div>
                        <PeriodChart periods={periods}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

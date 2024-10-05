import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Img from 'next/image'
import PageTransition from "@/components/PageTransition";
import './globals.css'
import React from "react";
import Link from 'next/link';
import Header from "@/components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Forever Us',
    description: '以此纪念M&X在一起的时光'
}

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh">
        <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
            <Header />
            <main
                className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-purple-200 p-4 text-center relative">
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
            <footer className="bg-purple-200 py-2">
                <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                    © 2024 forever-us. All rights reserved.
                </div>
            </footer>
        </div>
        </body>
        </html>
    )
}
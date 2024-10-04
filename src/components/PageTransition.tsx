"use client";

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();  // 获取当前路径

    return (
        <AnimatePresence mode="sync" initial={false}> {/* 确保退出动画生效 */}
            <motion.div
                key={pathname} // 每次路径变化都会触发新的动画
                initial={{ opacity: 0, x: 100 }} // 页面进入时的初始状态，来自右侧
                animate={{ opacity: 1, x: 0 }}   // 页面进入后的动画，恢复原位
                //exit={{ opacity: 0, x: -100 }}    // 页面退出时的动画，向左淡出
                transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.5,
                }}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

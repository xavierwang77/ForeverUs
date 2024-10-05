import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils"

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors " +
                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-m leading-none font-bold">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "爱情信物",
        href: "/",
        description:
            "收集所有我们赠予对方的物品。",
    },
    {
        title: "足迹地图",
        href: "/footprint",
        description:
            "记录我们一起去过的地方。",
    }
]

export default function Navigator() {
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-primary-foreground text-primary text-lg font-bold hover:bg-primary hover:text-primary-foreground">Explore</NavigationMenuTrigger>
                        <NavigationMenuContent className="">
                            <ul className="flex flex-col w-[180px] gap-3 p-4 md:w-[200px] md:grid-cols-2 lg:w-[180px]">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
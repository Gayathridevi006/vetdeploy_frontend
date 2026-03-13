import { cn } from "@/lib/utils";
import React from "react"

interface Props {
    children: React.ReactNode;
    className?: string;
}
const Container = ({ children, className }: Props) => {
    return (
        <div className={cn("max-w-2xl mx-auto")}>
            {children}
        </div>
    )
}

export default Container
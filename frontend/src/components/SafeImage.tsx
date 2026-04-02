"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { ImageIcon } from "lucide-react"

export function SafeImage(props: ImageProps) {
    const [error, setError] = useState(false)

    if (error) {
        const baseClasses = "flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 overflow-hidden"
        const fillClasses = props.fill ? "absolute inset-0" : ""
        
        return (
            <div className={`${baseClasses} ${fillClasses} ${props.className || ''}`} style={props.fill ? undefined : { width: props.width || '100%', height: props.height || '100%' }}>
                <ImageIcon className="w-8 h-8 text-black/20 dark:text-white/20" />
            </div>
        )
    }

    return <Image {...props} onError={() => setError(true)} />
}

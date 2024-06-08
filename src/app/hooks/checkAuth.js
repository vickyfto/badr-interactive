"use client"

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const CheckAuth = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    console.log('pathname:', pathname)

    useEffect(() => {
        const notAuthenticate = !localStorage.getItem("manual_auth") && !localStorage.getItem("auth_fb");
        if (window !== 'undefined') {
            if (notAuthenticate) {
                router.push("/login")
            }
            if (pathname === "/login") {
                if (!notAuthenticate) {
                    router.push("/")
                }
            }
        }
    }, [])

    return children
}

export default CheckAuth;
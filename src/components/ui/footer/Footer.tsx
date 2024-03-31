import { titleFont } from "@/config/fonts"
import Link from "next/link"


export const Footer = () => {
    return (
        <div className="flex w-full h-[5vh] justify-center items-center text-xd mt-4 bg-white">

            <Link
                href='/'
            >
                <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                <span> | shop</span>
                <span> © {new Date().getFullYear()}</span>
            </Link>
            <Link
                href='/'
                className="mx-3"
            >
                Privacidad & Legal
            </Link>

            <Link
                href='/'
                className="mx-3"
            >
                Ubicaciones
            </Link>

        </div >
    )
}

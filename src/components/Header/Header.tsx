import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiCameraMovie } from "react-icons/bi";

const Header = () => {
    return (
        <header className="container sticky bg-black px-6 md:px-0 top-0 z-50 py-4 mx-auto">
            <nav className="flex justify-between">
                <Link href="/" className="hover:opacity-75 duration-300">
                    <BiCameraMovie size={64} />
                </Link>
                <div className="">
                    <h1 className="text-4xl font-bold">Movies</h1>
                    <p className="text-gray-500">Find your favorite movies</p>
                </div>
            </nav>
        </header>
    )

}

export default Header;
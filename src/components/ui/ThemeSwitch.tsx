"use client";

import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeSwitch = (props: any) => {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const { Component, isSelected, getBaseProps, getInputProps } =
        useSwitch({ ...props, isSelected: isDark });

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (stored === "dark" || (!stored && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDark(false);
            document.documentElement.classList.remove("dark");
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const theme = isSelected ? "dark" : "light";
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle("dark", isSelected);
    }, [isSelected, mounted]);

    return (
        <div className="flex flex-col gap-2">
            <Component {...getBaseProps()} onClick={() => setIsDark(!isDark)}>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <div className="w-8 h-8 flex items-center justify-center">
                    {isSelected ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                </div>
            </Component>
        </div>
    );
};

export default ThemeSwitch;

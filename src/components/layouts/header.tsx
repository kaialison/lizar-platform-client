"use client";

import { Button, DropdownItem, DropdownMenu, Dropdown, DropdownTrigger, Input, Image, Kbd } from "@nextui-org/react";
import { Search, Bell, Sun, ChevronDown } from "lucide-react";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ThemeSwitch from "../ui/ThemeSwitch";
const getTimeByTimezone = (timezone: string, use12HourFormat: boolean) => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: use12HourFormat,
        timeZone: timezone,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    let formatted = formatter.format(date);

    if (use12HourFormat) {
        formatted = formatted.replace(/\s?(am|pm)/i, (match) => ` ${match.toUpperCase().trim()}`);
    }

    return formatted;
};

export default function Header() {
    const [use12HourFormat, setUse12HourFormat] = useState(true);
    const [language, setLanguage] = useState<"en" | "vi">("en");
    const [time, setTime] = useState(getTimeByTimezone(language === "vi" ? "Asia/Ho_Chi_Minh" : "UTC", language === "en"));

    useEffect(() => {
        const timezone = language === "vi" ? "Asia/Ho_Chi_Minh" : "UTC";
        const interval = setInterval(() => {
            setTime(getTimeByTimezone(timezone, use12HourFormat));
        }, 1000);

        return () => clearInterval(interval);
    }, [language, use12HourFormat]);

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem("use12HourFormat", JSON.stringify(use12HourFormat));
    }, [use12HourFormat]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        const storedFormat = localStorage.getItem("use12HourFormat");

        if (storedLanguage === "en" || storedLanguage === "vi") {
            setLanguage(storedLanguage);
        }

        if (storedFormat !== null) {
            setUse12HourFormat(JSON.parse(storedFormat));
        }
    }, []);

    return (
        <div className="w-full flex items-center justify-between md:px-8 px-4 py-4 shadow-sm bg-white dark:bg-[#1a1a1a] text-black dark:text-white transition-colors duration-300">
            <div className="w-1/3">
                <Input
                    placeholder="Search"
                    startContent={<Search size={20} className="text-secondary-500" />}
                    endContent={
                        <Kbd keys={["command"]} className="text-sm bg-default-50 rounded text-secondary-600 border-1 border-neutral-200 font-bold shadow-none">/</Kbd>
                    }
                    disableAnimation
                    className="max-w-sm"
                    classNames={{
                        inputWrapper: "bg-white dark:bg-[#333333] shadow-none border-1 border-neutral-200 dark:border-neutral-600 hover:bg-transparent focus:border-neutral-200 data-[focus=true]:bg-white dark:data-[focus=true]:bg-[#333333]",
                        input: "text-secondary-500 text-base hover:bg-transparent focus:outline-none dark:text-white dark:border-neutral-600 dark:bg-transparent"
                    }}
                />
            </div>
            <div className="flex items-center gap-4">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="light"
                            className="text-sm text-gray-900 dark:text-gray-200 font-semibold px-0"
                        >
                            <div className="flex items-center gap-1">
                                <span>{time}</span>
                                <span>({language === "vi" ? "GMT +7" : "GMT"})</span>
                                <ChevronDown size={18} />
                            </div>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Hour Format Selection"
                        onAction={(key) => setUse12HourFormat(key === "12h")}
                    >
                        <DropdownItem key="12h">12-hour format</DropdownItem>
                        <DropdownItem key="24h">24-hour format</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            disableAnimation
                            variant="light"
                            className="px-0"
                        >
                            <div className="flex items-center gap-1 px-4 border-x-2 border-neutral-200 dark:border-neutral-600">
                                <Image
                                    src={`${language === "vi"
                                        ? ""
                                        : "https://d1j8r0kxyu9tj8.cloudfront.net/files/P4bHzmeF9rUGvcfY8vc9m8tRmLQ2FON2LFjWEqNw.png"
                                        }`}
                                    alt="Language"
                                    width={20}
                                    height={20}
                                />
                                <span className="text-secondary-900 dark:text-white font-semibold">{language === "vi" ? "VN" : "EN"}</span>
                                <ChevronDown size={20} />
                            </div>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Language Selection"
                        onAction={(key) => setLanguage(key as "en" | "vi")}
                    >
                        <DropdownItem key="en">English</DropdownItem>
                        <DropdownItem key="vi">Tiếng Việt</DropdownItem>
                    </DropdownMenu>

                </Dropdown>
                <ThemeSwitch />
                <button className="hover:text-red-700 relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <Avatar
                    src="https://i.pravatar.cc/40?img=3"
                    size="md"
                    className="cursor-pointer"
                />
            </div>
        </div>
    );
}

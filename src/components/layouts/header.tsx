"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
    useDisclosure,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Avatar,
} from "@nextui-org/react";

import { Link } from "@nextui-org/link";
import { CaretDown, List, SignOut, UserCircle, X } from "@phosphor-icons/react";
import { groupBy, objectToArray } from "@/utils/kits";
import { ROUTE_PATH } from "@/utils/route";

type HeaderItem = {
    name: string;
    type?: "dropdown" | "popover";
    link?: string;
    items?: {
        name?: string;
        link?: string;
        iconUrl?: string;
        description?: string;
        items?: any[];
    }[];
};

type HeaderProps = {
    variant?: 'dark' | 'light';
};

const Header = ({ variant: initialVariant }: HeaderProps): JSX.Element => {
    const { isOpen, onOpenChange } = useDisclosure();
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [variant, setVariant] = useState(initialVariant);
    const pathname = usePathname();

    // Xử lý variant của header dựa trên vị trí scroll và pathname
    useEffect(() => {
        const checkPosition = () => {
            // Nếu menu mobile đang mở, luôn dùng light variant
            if (menuOpen) {
                setVariant('light');
                return;
            }
            
            const isAtTop = window.scrollY === 0 && pathname === '/';
            setVariant(isAtTop ? initialVariant : 'light');
        };

        checkPosition();
        window.addEventListener('scroll', checkPosition);
        return () => window.removeEventListener('scroll', checkPosition);
    }, [initialVariant, pathname, menuOpen]); // Thêm menuOpen vào dependencies

    // Xử lý menu mobile
    const toggleMenu = () => {
        const newMenuState = !menuOpen;
        setMenuOpen(newMenuState);
        // Khi mở menu, chuyển sang light mode
        if (newMenuState) {
            setVariant('light');
        } else {
            // Khi đóng menu, kiểm tra lại điều kiện để set variant phù hợp
            const isAtTop = window.scrollY === 0 && pathname === '/';
            setVariant(isAtTop ? initialVariant : 'light');
        }
    };

    const toggleDropdown = (name: string) => {
        setActiveDropdown((prev) => (prev === name ? null : name));
    };

    useEffect(() => {
        if (isOpen) {
            setActiveDropdown(null);
        }
    }, [isOpen]);

    const headerItems: HeaderItem[] = useMemo(
        () => [
            { name: "Về HappyLand", link: "#" },
            { name: "Tiện ích sân", link: "#" },
            { name: "Đánh giá", link: "#" },
            { name: "Tin tức", link: "#" },
            { name: "Sự kiện", link: "#" },
            { name: "Blog", link: "#" },
            { name: "Liên hệ", link: "#" },
        ],
        []
    );

    return (
        <header className="fixed top-0 z-40 w-full transition-colors duration-200">
            <div className={`border-b ${
                variant === 'light' ? 'bg-white border-gray-200' : 
                variant === 'dark' ? 'bg-black border-gray-800' : 
                'border-transparent'
            }`}>
                <div className="container">
                    <div className="flex h-20 items-center">
                        <div className="flex w-full items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                {variant === 'light' ? (
                                    <img className="w-[177.5px] h-[40px]" src="/Logo-dark.svg" alt="HappyLand Pickleball" />
                                ) : (
                                    <img className="w-[177.5px] h-[40px]" src="/Logo.svg" alt="HappyLand Pickleball" />
                                )}
                            </Link>
                            <nav className="hidden lg:flex items-center gap-8">
                                {headerItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.link}
                                        className={`text-md font-semibold ${
                                            variant === 'dark' ? 'text-white' : 
                                            variant === 'light' ? 'text-gray-600 hover:text-gray-900' : 
                                            'text-white'
                                        } transition-colors`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <Button
                            onClick={toggleMenu}
                            isIconOnly
                            variant="light"
                            className={`lg:hidden ${
                                variant === 'dark' ? 'text-white' : 
                                variant === 'light' ? 'text-primary-900 hover:text-gray-900' : 
                                'text-white'
                            }`}
                        >
                            {menuOpen ? (
                                <X size={24} weight="bold" className="transition-transform duration-200" />
                            ) : (
                                <List size={24} className="transition-transform duration-200" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white min-h-screen">
                    <nav className="container py-4">
                        {headerItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className="block py-4 text-primary-900 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;

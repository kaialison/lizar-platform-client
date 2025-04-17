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
    defaultColorScheme?: 'dark' | 'light';
};

const Header = ({ 
    variant: initialVariant, 
    defaultColorScheme = 'dark' 
}: HeaderProps): JSX.Element => {
    const { isOpen, onOpenChange } = useDisclosure();
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [variant, setVariant] = useState(initialVariant);
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    // Kiểm tra header scheme từ EmptyContent
    const [headerScheme, setHeaderScheme] = useState(defaultColorScheme);

    useEffect(() => {
        const checkHeaderScheme = () => {
            const emptyContent = document.querySelector('[data-header-scheme]');
            if (emptyContent) {
                const scheme = emptyContent.getAttribute('data-header-scheme') as 'dark' | 'light';
                setHeaderScheme(scheme);
            } else {
                setHeaderScheme(defaultColorScheme);
            }
        };

        checkHeaderScheme();
        // Tạo một observer để theo dõi sự thay đổi của DOM
        const observer = new MutationObserver(checkHeaderScheme);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [defaultColorScheme]);

    useEffect(() => {
        const handleScroll = () => {
            const isAtTop = window.scrollY === 0;
            setIsScrolled(!isAtTop);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Xử lý variant của header dựa trên vị trí scroll
    useEffect(() => {
        const checkPosition = () => {
            if (menuOpen) {
                setVariant('light');
                return;
            }
            
            const isAtTop = window.scrollY === 0;
            setVariant(isAtTop ? initialVariant : 'light');
        };

        checkPosition();
        window.addEventListener('scroll', checkPosition);
        return () => window.removeEventListener('scroll', checkPosition);
    }, [initialVariant, menuOpen]);

    // Xử lý menu mobile
    const toggleMenu = () => {
        const newMenuState = !menuOpen;
        setMenuOpen(newMenuState);
        // Khi mở menu, chuyển sang light mode
        if (newMenuState) {
            setVariant('light');
        } else {
            // Khi đóng menu, kiểm tra lại điều kiện để set variant phù hợp
            const isAtTop = window.scrollY === 0;
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
            { name: "Về HappyLand", link: "/about" },
            { name: "Tiện ích sân", link: "/facilities" },
            { name: "Đánh giá", link: "/reviews" },
            { name: "Tin tức", link: "/news" },
            { name: "Sự kiện", link: "/events" },
            { name: "Blog", link: "/blog" },
            { name: "Liên hệ", link: "/contact" },
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
                                {(variant === 'light' || (!variant && headerScheme === 'light')) ? (
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
                                            variant === 'dark' || (!variant && headerScheme === 'dark') ? 'text-white' : 
                                            'text-gray-600 hover:text-gray-900'
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
                                variant === 'dark' || (!variant && headerScheme === 'dark') ? 'text-white' : 
                                'text-primary-900 hover:text-gray-900'
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

"use client";
import { useLayoutEffect, useMemo, useReducer, useRef } from "react";
import { usePathname } from "next/navigation";
import {
    useDisclosure,
    Button,
} from "@nextui-org/react";

import { Link } from "@nextui-org/link";
import { List, X } from "@phosphor-icons/react";

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

// Header state and reducer
type HeaderState = {
    isScrolled: boolean;
    variant: 'dark' | 'light' | undefined;
    headerScheme: 'dark' | 'light';
    menuOpen: boolean;
    activeDropdown: string | null;
};

type HeaderAction = 
    | { type: 'SET_SCROLL_STATE'; payload: boolean }
    | { type: 'SET_VARIANT'; payload: 'dark' | 'light' | undefined }
    | { type: 'SET_SCHEME'; payload: 'dark' | 'light' }
    | { type: 'TOGGLE_MENU'; payload: boolean }
    | { type: 'TOGGLE_DROPDOWN'; payload: string }
    | { type: 'UPDATE_ALL'; payload: Partial<HeaderState> };

const headerReducer = (state: HeaderState, action: HeaderAction): HeaderState => {
    switch (action.type) {
        case 'SET_SCROLL_STATE':
            return { ...state, isScrolled: action.payload };
        case 'SET_VARIANT':
            return { ...state, variant: action.payload };
        case 'SET_SCHEME':
            return { ...state, headerScheme: action.payload };
        case 'TOGGLE_MENU':
            return { ...state, menuOpen: action.payload };
        case 'TOGGLE_DROPDOWN':
            return { 
                ...state, 
                activeDropdown: state.activeDropdown === action.payload ? null : action.payload 
            };
        case 'UPDATE_ALL':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const Header = ({ 
    variant: initialVariant, 
    defaultColorScheme = 'dark' 
}: HeaderProps): JSX.Element => {
    const { isOpen } = useDisclosure();
    const pathname = usePathname();
    const prevPathRef = useRef(pathname);
    
    // Initialize state with useReducer
    const [state, dispatch] = useReducer(headerReducer, {
        isScrolled: false,
        variant: initialVariant,
        headerScheme: defaultColorScheme,
        menuOpen: false,
        activeDropdown: null
    });
    
    // Combined effect for handling all header state changes
    useLayoutEffect(() => {
        const updateHeaderState = () => {
            const isAtTop = window.scrollY === 0;
            const isHomePage = pathname === '/';
            const isScrolled = !(isAtTop && isHomePage);
            
            // Check for header scheme from DOM
            const emptyContent = document.querySelector('[data-header-scheme]');
            const headerScheme = emptyContent 
                ? (emptyContent.getAttribute('data-header-scheme') as 'dark' | 'light') 
                : defaultColorScheme;
            
            // Determine variant based on scroll position and menu state
            let variant = initialVariant;
            if (state.menuOpen) {
                variant = 'light';
            } else {
                variant = isAtTop ? initialVariant : 'light';
            }
            
            // Update all state at once to prevent multiple renders
            dispatch({ 
                type: 'UPDATE_ALL', 
                payload: { 
                    isScrolled,
                    headerScheme,
                    variant
                } 
            });
        };
        
        // Run immediately on mount and route change
        updateHeaderState();
        
        // Add scroll listener
        window.addEventListener('scroll', updateHeaderState);
        
        // Handle body scroll lock for mobile menu
        if (state.menuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.height = 'auto';
        }
        
        // Check if pathname changed
        if (prevPathRef.current !== pathname) {
            // Force immediate update on route change
            updateHeaderState();
            prevPathRef.current = pathname;
        }
        
        return () => {
            window.removeEventListener('scroll', updateHeaderState);
            document.body.style.overflow = 'unset';
            document.body.style.height = 'auto';
        };
    }, [initialVariant, defaultColorScheme, pathname, state.menuOpen]);
    
    // Handle menu toggle
    const toggleMenu = () => {
        const newMenuState = !state.menuOpen;
        dispatch({ type: 'TOGGLE_MENU', payload: newMenuState });
        
        // Update variant immediately
        if (newMenuState) {
            dispatch({ type: 'SET_VARIANT', payload: 'light' });
        } else {
            const isAtTop = window.scrollY === 0 && pathname === '/';
            dispatch({ type: 'SET_VARIANT', payload: isAtTop ? initialVariant : 'light' });
        }
    };
    
    // Handle dropdown toggle
    const toggleDropdown = (name: string) => {
        dispatch({ type: 'TOGGLE_DROPDOWN', payload: name });
    };
    
    // Memoize header items to prevent unnecessary re-renders
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
                state.variant === 'light' ? `${state.menuOpen ? 'bg-white' : 'bg-white/70 backdrop-blur-md'} border-gray-200` : 
                state.variant === 'dark' ? 'bg-black border-gray-800' : 
                'border-transparent'
            }`}>
                <div className="container">
                    <div className="flex h-20 items-center">
                        <div className="flex w-full items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                {(state.variant === 'light' || (!state.variant && state.headerScheme === 'light')) ? (
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
                                            state.variant === 'dark' || (!state.variant && state.headerScheme === 'dark') ? 'text-white' : 
                                            'text-gray-900'
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
                                state.variant === 'dark' || (!state.variant && state.headerScheme === 'dark') ? 'text-white' : 
                                'text-primary-900 hover:text-gray-900'
                            }`}
                        >
                            {state.menuOpen ? (
                                <X size={24} weight="bold" className="transition-transform duration-200" />
                            ) : (
                                <List size={24} weight="bold" className="transition-transform duration-200" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {state.menuOpen && (
                <div className="lg:hidden fixed inset-x-0 bottom-0 top-20 bg-white overflow-y-auto">
                    <nav className="container py-4 h-full">
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

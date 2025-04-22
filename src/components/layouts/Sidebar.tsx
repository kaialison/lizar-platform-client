// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import {
    Volume2,
    Image,
    Settings,
    User,
    ChartColumnIncreasing,
    ImagePlus,
    KeyRound,
    PanelTop,
    Menu
} from "lucide-react";

const sidebarItems = [
    { label: "Dashboard", icon: ChartColumnIncreasing, href: "/dashboard" },
    { label: "Report", icon: Image, href: "/report" },
    { label: "Campaign", icon: Volume2, href: "/campaign" },
    { label: "Creative", icon: ImagePlus, href: "/creative" },
    { label: "Set Keyword", icon: KeyRound, href: "/set-keyword" },
    { label: "Landing Page", icon: PanelTop, href: "/landing-page" },
    { label: "Rule", icon: Settings, href: "/rule" },
    { label: "Setting", icon: User, href: "/setting" },
];

const Sidebar = () => {

    return (
        <aside className="h-full bg-white flex flex-col justify-between">
            <div>
                <div className="flex items-center pb-8">
                    <img src="/images/logo.svg" alt="Logo" />
                    <div className="ml-auto">
                        <Menu size={24} />
                    </div>
                </div>
                <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            icon={<item.icon size={18} />}
                            label={item.label}
                            href={item.href}
                            active={item.label === "Dashboard"}
                        />
                    ))}
                </nav>
            </div>
            <div className="space-y-3 text-sm">
                <KpiCard label="Personal KPI" value="1,759$ / 2,345$" percent={75} />
                <KpiCard label="Team KPI" value="12,823$ / 20,500$" percent={63} />
            </div>
        </aside>
    );
};

const SidebarItem = ({
    icon,
    label,
    href,
    active = false,
}: {
    icon: React.ReactNode;
    label: string;
    href: string;
    active?: boolean;
}) => {
    return (
        <Link href={href}>
            <div
                className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition ${active ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                    }`}
            >
                {icon}
                <span>{label}</span>
            </div>
        </Link>
    );
};

const KpiCard = ({
    label,
    value,
    percent,
}: {
    label: string;
    value: string;
    percent: number;
}) => {
    return (
        <div className="border-1 border-neutral-200 rounded-xl p-4 space-y-2 shadow">
            <div className="text-secondary-900 font-semibold text-base">{label}</div>
            <div className="flex justify-between">
                <div className="text-sm text-secondary-900 font-medium">{value}</div>
                <div className="text-sm text-secondary-900 font-medium">{percent}%</div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${percent}%`,
                        background: "linear-gradient(to right, #7ecbff, #3182ce)",
                    }}
                />
            </div>
        </div>
    );
};

export default Sidebar;

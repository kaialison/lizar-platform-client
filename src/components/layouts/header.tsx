import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const menuItems = [
        { icon: "📊", label: "Dashboard", href: "/" },
        { icon: "📝", label: "Report", href: "/report" },
        { icon: "📣", label: "Campaign", href: "/campaign" },
        { icon: "🎨", label: "Creative", href: "/creative" },
        { icon: "🔑", label: "Set Keyword", href: "/keyword" },
        { icon: "🌐", label: "Landing Page", href: "/landing" },
        { icon: "⚙️", label: "Rule", href: "/rule" },
        { icon: "⚙️", label: "Setting", href: "/settings" },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-secondary">
            <div className="flex items-center px-6 py-4">
                <img
                    src="/images/logo.svg"
                    alt="Logo"
                />
            </div>

            <nav className="px-4 py-4">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link 
                                href={item.href}
                                className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <span className="mr-3">{item.icon}</span>
                                <span className="text-md font-semibold">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* KPI Section */}
            <div className="absolute bottom-8 left-0 right-0 px-6">
                <div className="space-y-4">
                    {/* Personal KPI */}
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Personal KPI</h3>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">1,759$ / 2,345$</span>
                            <span className="text-sm">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                    </div>

                    {/* Team KPI */}
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Team KPI</h3>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">12,832$ / 20,500$</span>
                            <span className="text-sm">63%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '63%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Header;
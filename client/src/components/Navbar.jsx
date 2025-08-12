
"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, TrendingUp, BarChart3, Wallet } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        {
            label: "Dashboard",
            href: "/",
            icon: BarChart3,

        },
        {
            label: "Holdings",
            href: "/holdings",
            icon: Wallet,

        },
    ];

    const isActive = (href) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav className="bg-white shadow-xs border-b border-slate-100 fixed top-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4 xl:px-0 lg:px-8 sm:px-6">
                    <div className="flex justify-between h-16 items-center">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-slate-900 hover:text-blue-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="p-1.5 bg-blue-500 rounded-lg">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold">PortfolioTracker</span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
                                            ? "bg-blue-50 text-blue-500"
                                            : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                aria-label="Toggle mobile menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-100">

                    <div
                        className="fixed inset-0 bg-white/5 backdrop-blur-[1.5px] transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />


                    {/* Mobile Menu Panel */}
                    <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl transform transition-transform">
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between p-4 ">
                            <div className="flex items-center space-x-2">
                                <div className="p-1.5 bg-blue-500 rounded-lg">
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-md font-semibold text-slate-900">PortfolioTracker</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                aria-label="Close mobile menu"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Mobile Menu Items */}
                        <div className="p-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${active
                                            ? "bg-blue-50 text-blue-500"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${active
                                            ? "bg-blue-200"
                                            : "bg-slate-100"
                                            }`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{item.label}</div>
                                            <div className="text-xs text-slate-500">{item.description}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
                            <div className="text-center">
                                <div className="text-sm font-medium text-slate-900">Portfolio Dashboard</div>
                                <div className="text-xs text-slate-500 mt-1">Track • Analyze • Invest Smart</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
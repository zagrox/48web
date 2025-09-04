import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

// --- Icons ---
const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
// --- End Icons ---


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Slot (for RTL this is right) - Mobile Menu Button */}
                        <div className="flex-1 flex justify-start">
                            <button
                                className="md:hidden p-2 -mr-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                                onClick={() => setIsMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <MenuIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Center Slot - Logo */}
                        <div className="flex-1 flex justify-center">
                            <Link to="/" className="text-2xl font-bold text-black dark:text-white">
                                IR48
                            </Link>
                        </div>

                        {/* Right Slot (for RTL this is left) - Theme Toggle */}
                        <div className="flex-1 flex justify-end">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay & Panel */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)}></div>
            </div>

            <div
                className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white dark:bg-black z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
            >
                <div className="p-5">
                    <div className="flex items-center justify-between mb-8">
                        <h2 id="mobile-menu-title" className="text-lg font-bold">منو</h2>
                        <button
                            className="p-2 -mr-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-2">
                        <Link to="/" className="text-lg px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                            صفحه اصلی
                        </Link>
                        <Link to="/wizard" className="text-lg px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                            جادوگر هوشمند
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Header;

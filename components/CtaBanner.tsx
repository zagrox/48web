import React from 'react';
import { Link } from 'react-router-dom';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
);

const CtaBanner: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-tr from-gray-50 to-gray-100 dark:from-black dark:to-gray-900/90 p-10 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 z-0 opacity-70">
            {/* Animated Blobs */}
            <div className="absolute top-0 -end-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900/50 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-1/4 -start-1/4 w-96 h-96 bg-teal-200 dark:bg-teal-900/50 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            {/* Static Shapes */}
            <div className="absolute -top-16 -start-16 w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl transform rotate-45"></div>
            <div className="absolute -bottom-16 -end-16 w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl transform rotate-12"></div>
        </div>

        {/* Text on right, button on left for RTL on md+ screens */}
        <div className="relative z-10 md:flex md:flex-row md:justify-between md:items-center">
            {/* Text Content */}
            <div className="text-center md:text-right">
                <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">
                    ایده‌های تجاری را به واقعیت تبدیل کنید!
                </h2>
                <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-lg text-gray-600 dark:text-gray-300">
                    با جادوگر هوشمند نیازهای پروژه خود را مشخص کرده و پیشنهاد اولیه دریافت کنید.
                </p>
            </div>
            
            {/* CTA Button */}
            <div className="mt-8 md:mt-0 flex-shrink-0 flex justify-center md:justify-start">
                <Link
                    to="/wizard"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black dark:text-black dark:bg-white hover:opacity-90 transition-opacity shadow-lg"
                >
                    شروع با جادوگر هوشمند
                    <ArrowLeftIcon className="w-5 h-5 ms-2" />
                </Link>
            </div>
        </div>
    </div>
  );
};

export default CtaBanner;
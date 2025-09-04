import React from 'react';
import { Link } from 'react-router-dom';

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
);

const WizardPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="max-w-3xl w-full">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8 transition-colors">
                <ArrowRightIcon className="h-4 w-4 me-2" />
                بازگشت به صفحه اصلی
            </Link>

            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-8 sm:p-12">
                <h1 className="text-4xl font-bold text-black dark:text-white sm:text-5xl">
                    جادوگر هوشمند کسب و کار
                </h1>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    این ابزار هوشمند به زودی به شما کمک خواهد کرد تا با پاسخ به چند سوال ساده، نقشه راه جامعی برای راه اندازی یا توسعه کسب و کار خود دریافت کنید. از انتخاب نام برند تا استراتژی بازاریابی، ما شما را قدم به قدم راهنمایی خواهیم کرد.
                </p>
                
                <div className="mt-12">
                    <button 
                        disabled
                        className="w-full sm:w-auto inline-block bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-12 py-4 rounded-md cursor-not-allowed text-lg font-semibold">
                        به زودی فعال می‌شود...
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WizardPage;
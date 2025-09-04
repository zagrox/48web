import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const defaultTitle = 'IR48.com - خدمات برندینگ و دیجیتال مارکتینگ';
const defaultDescription = 'مجموعه‌ای از ۴۸ سرویس تخصصی در زمینه برندینگ، بازاریابی دیجیتال و توسعه اپلیکیشن. این سایت با حالت تاریک/روشن، کاملاً فارسی و راست‌چین، صفحات جزئیات برای هر سرویس ارائه می‌دهد.';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id.toString() === id);

  useEffect(() => {
    const metaDescriptionTag = document.querySelector('meta[name="description"]');

    if (service) {
      document.title = `${service.name} | IR48.com`;
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', service.description);
      }
    } else {
      document.title = 'سرویس یافت نشد | IR48.com';
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', 'متاسفانه نتوانستیم سرویسی با این مشخصات پیدا کنیم.');
      }
    }

    return () => {
      document.title = defaultTitle;
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', defaultDescription);
      }
    };
  }, [id, service]);


  if (!service) {
    return (
        <div className="text-center py-20">
            <h1 className="text-2xl font-bold">سرویس مورد نظر یافت نشد</h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">متاسفانه نتوانستیم سرویسی با این مشخصات پیدا کنیم.</p>
            <Link to="/" className="mt-6 inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:opacity-90 transition-opacity">
                بازگشت به صفحه اصلی
            </Link>
        </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 me-2 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            بازگشت به لیست سرویس‌ها
        </Link>
        
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-8">
            <header>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{service.category}</span>
                <h1 className="text-4xl font-bold text-black dark:text-white mt-2">{service.name}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mt-3 italic">"{service.slogan}"</p>
            </header>
            
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
            
            <section className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p>{service.description}</p>
            </section>
            
            <section className="mt-12 p-6 bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-black dark:text-white">فرم هوشمند سفارش</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    به زودی در این بخش می توانید درخواست خود را برای این سرویس به صورت آنلاین ثبت و سفارشی سازی کنید.
                </p>
                <button 
                    disabled
                    className="mt-6 inline-block bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-8 py-3 rounded-md cursor-not-allowed">
                    به زودی...
                </button>
            </section>
        </div>
    </article>
  );
};

export default ServiceDetailPage;
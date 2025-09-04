import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import { getServiceIconComponent } from './ServiceIcons';

interface ServiceCardProps {
  service: Service;
}

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
);


const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = getServiceIconComponent(service.id);
  
  return (
    <Link 
        to={`/service/${service.id}`}
        className="group relative block p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-lg hover:border-black dark:hover:border-white transition-all duration-300 transform hover:-translate-y-2"
    >
        <div className="absolute top-4 end-4 flex flex-col items-end gap-2 z-10">
            {service.tier === 'Pro' && (
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Pro</span>
            )}
            {service.hasOffer && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">تخفیف</span>
            )}
        </div>
        <div className="flex flex-col h-full">
            <div className="flex-grow">
                <div className="mb-4">
                    <IconComponent className="w-8 h-8 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{service.category}</span>
                <h3 className="text-lg font-bold text-black dark:text-white mt-3 mb-1">{service.name}</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mb-2">{service.originalName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{service.slogan}</p>
            </div>
            <div className="mt-4 flex items-center justify-end text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                <span>مشاهده جزئیات</span>
                <ArrowLeftIcon className="w-4 h-4 ms-2 transform transition-transform duration-300 group-hover:-translate-x-1" />
            </div>
        </div>
    </Link>
  );
};

export default ServiceCard;

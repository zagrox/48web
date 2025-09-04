import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import { getServiceIconComponent } from './ServiceIcons';

interface ServiceListItemProps {
  service: Service;
}

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
);

const ServiceListItem: React.FC<ServiceListItemProps> = ({ service }) => {
  const IconComponent = getServiceIconComponent(service.id);

  return (
    <Link 
        to={`/service/${service.id}`}
        className="group flex items-center p-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md hover:border-black dark:hover:border-white transition-all duration-300"
    >
        <div className="flex-shrink-0 me-4">
            <IconComponent className="w-8 h-8 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="flex-grow">
            <h3 className="text-md font-bold text-black dark:text-white">{service.name}</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">{service.originalName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{service.slogan}</p>
        </div>
        <div className="hidden md:flex items-center gap-2 mx-4">
            {service.tier === 'Pro' && (
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Pro</span>
            )}
            {service.hasOffer && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">تخفیف</span>
            )}
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">{service.category}</span>
        </div>
        <div className="flex-shrink-0 flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
            <span className="hidden sm:inline">جزئیات</span>
            <ArrowLeftIcon className="w-4 h-4 ms-2 transform transition-transform duration-300 group-hover:-translate-x-1" />
        </div>
    </Link>
  );
};

export default ServiceListItem;

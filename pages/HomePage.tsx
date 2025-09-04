
import React, { useState, useMemo } from 'react';
import { SERVICES } from '../constants';
import { ServiceCategory, ServiceTier } from '../types';
import ServiceCard from '../components/ServiceCard';
import CtaBanner from '../components/CtaBanner';
import ServiceListItem from '../components/ServiceListItem';

const CATEGORIES: ServiceCategory[] = [
  'استراتژی و هویت برند',
  'طراحی و تولیدات خلاق',
  'توسعه وب‌سایت و فروشگاه آنلاین',
  'توسعه اپلیکیشن موبایل',
  'محتوا و شبکه‌های اجتماعی',
  'تبلیغات دیجیتال و سئو',
  'زیرساخت فنی و سازمانی',
  'تحلیل، بهینه‌سازی و رشد',
];

const GridIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const ListIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTier, setSelectedTier] = useState<ServiceTier | 'All'>('All');
    const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([]);
    const [showOffersOnly, setShowOffersOnly] = useState(false);
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');

    const tiers: { value: ServiceTier | 'All'; label: string }[] = [
        { value: 'Pro', label: 'Pro' },
        { value: 'Basic', label: 'Basic' },
        { value: 'All', label: 'همه' },
    ];

    const filteredServices = useMemo(() => {
        return SERVICES.filter(service => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const matchesSearch = searchTerm === '' || 
                service.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                service.originalName.toLowerCase().includes(lowerCaseSearchTerm) ||
                service.slogan.toLowerCase().includes(lowerCaseSearchTerm) ||
                service.description.toLowerCase().includes(lowerCaseSearchTerm);

            const matchesTier = selectedTier === 'All' || service.tier === selectedTier;

            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(service.category);

            const matchesOffer = !showOffersOnly || service.hasOffer;

            return matchesSearch && matchesTier && matchesCategory && matchesOffer;
        });
    }, [searchTerm, selectedTier, selectedCategories, showOffersOnly]);

    const toggleCategory = (category: ServiceCategory) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    return (
    <div className="space-y-12">

      <CtaBanner />

      <div className="space-y-6">
        {/* Filter Controls */}
        <div className="space-y-4">
            <div className="flex flex-col-reverse md:flex-row gap-4 items-center">
                <div className="relative w-full md:flex-grow">
                     <span className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="جستجو در سرویس‌ها..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full ps-4 pe-10 py-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none transition-shadow"
                    />
                </div>
                <div className="flex-shrink-0 flex w-full md:w-auto items-center gap-2 justify-between">
                    <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-700">
                        {(['Pro', 'Basic', 'All'] as const).map(tier => (
                            <button key={tier} onClick={() => setSelectedTier(tier)} className={`px-4 py-2 text-sm font-medium transition-colors first:rounded-s-md last:rounded-e-md ${selectedTier === tier ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                {tier === 'All' ? 'همه' : tier}
                            </button>
                        ))}
                    </div>
                     <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-700">
                        <button onClick={() => setLayout('grid')} className={`p-2 transition-colors ${layout === 'grid' ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-s-md`} aria-label="Grid View">
                            <GridIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => setLayout('list')} className={`p-2 transition-colors ${layout === 'list' ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-e-md`} aria-label="List View">
                            <ListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-3 py-1 text-sm border rounded-full transition-colors ${selectedCategories.includes(category) ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'bg-white dark:bg-black border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredServices.length} سرویس یافت شد
            </div>
             <button onClick={() => setShowOffersOnly(!showOffersOnly)} className="flex items-center gap-2 text-sm" aria-pressed={showOffersOnly}>
                <span>فقط نمایش تخفیف‌ها</span>
                <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${showOffersOnly ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${showOffersOnly ? 'translate-x-4' : ''}`} />
                </div>
            </button>
        </div>
      </div>
      
      {filteredServices.length > 0 ? (
        layout === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => (
                <ServiceListItem key={service.id} service={service} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16">
            <h3 className="text-xl font-bold">هیچ سرویسی یافت نشد</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">لطفاً فیلترهای خود را تغییر دهید یا عبارت جستجو را ویرایش کنید.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Service } from '../types';
import { getServiceIconComponent } from '../components/ServiceIcons';

const defaultTitle = 'IR48.com - خدمات برندینگ و دیجیتال مارکتینگ';
const defaultDescription = 'مجموعه‌ای از ۴۸ سرویس تخصصی در زمینه برندینگ، بازاریابی دیجیتال و توسعه اپلیکیشن. این سایت با حالت تاریک/روشن، کاملاً فارسی و راست‌چین، صفحات جزئیات برای هر سرویس ارائه می‌دهد.';

// --- Helper Icons for this page ---
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const TagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);
const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const UserGroupIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM12 15.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);


const RelatedServiceCard: React.FC<{ service: Service }> = ({ service }) => {
    const IconComponent = getServiceIconComponent(service.id);
    return (
        <Link 
            to={`/service/${service.id}`}
            className="group flex items-center p-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-lg hover:border-purple-500 dark:hover:border-purple-500 hover:scale-105 transition-all duration-300"
        >
            <div className="me-4 flex-shrink-0">
                <IconComponent className="w-7 h-7 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
            </div>
            <div>
                <h4 className="font-bold text-sm text-black dark:text-white">{service.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{service.category}</p>
            </div>
        </Link>
    );
};

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (service) {
      document.title = `${service.name} | IR48.com`;
      metaDescriptionTag?.setAttribute('content', service.description);
    } else {
      document.title = 'سرویس یافت نشد | IR48.com';
      metaDescriptionTag?.setAttribute('content', 'متاسفانه نتوانستیم سرویسی با این مشخصات پیدا کنیم.');
    }
    return () => {
      document.title = defaultTitle;
      metaDescriptionTag?.setAttribute('content', defaultDescription);
    };
  }, [id, service]);

  if (!service) {
    return (
        <div className="text-center py-20">
            <h1 className="text-2xl font-bold">سرویس مورد نظر یافت نشد</h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">متاسفانه نتوانستیم سرویسی با این مشخصات پیدا کنیم. لطفاً از منوی بالا برای بازگشت استفاده کنید.</p>
        </div>
    );
  }

  const relatedServices = service.relatedServices?.map(relatedId => 
      SERVICES.find(s => s.id === relatedId)
  ).filter((s): s is Service => s !== undefined) || [];

  const IconComponent = getServiceIconComponent(service.id);

  return (
    <article className="space-y-12">
        <header className="relative flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-tr from-gray-50 to-gray-100 dark:from-black dark:to-gray-900/90 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
             <div aria-hidden="true" className="absolute inset-0 z-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%200h40v40H0z%22/%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            <div className="relative flex-shrink-0 p-5 bg-white/50 dark:bg-black/50 rounded-2xl shadow-lg backdrop-blur-sm">
                <IconComponent className="w-16 h-16 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="relative text-center md:text-right">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{service.category}</span>
                <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mt-2">{service.name}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 italic">"{service.slogan}"</p>
            </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.estimatedTimeline && <InfoCard Icon={ClockIcon} label="زمان‌بندی تخمینی" value={service.estimatedTimeline} />}
            {service.pricingModel && <InfoCard Icon={TagIcon} label="مدل قیمت‌گذاری" value={service.pricingModel} />}
            <InfoCard Icon={StarIcon} label="سطح سرویس" value={service.tier} />
        </section>
        
        <div className="space-y-8">
            <section className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p className="lead">{service.description}</p>
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-8">
                {service.methodology && service.methodology.length > 0 && (
                    <ContentCard title="متدولوژی و فرآیند ما">
                        <div className="border-s-2 border-purple-200 dark:border-purple-800/50 ps-8 space-y-10">
                            {service.methodology.map(step => (
                                <div key={step.step} className="relative">
                                    <div className="absolute -start-10 top-1 w-6 h-6 bg-purple-600 dark:bg-purple-400 text-white dark:text-black rounded-full flex items-center justify-center font-bold text-xs">{step.step}</div>
                                    <h3 className="text-lg font-bold">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </ContentCard>
                )}

                {service.deliverables && service.deliverables.length > 0 && (
                    <ContentCard title="خروجی‌های قابل تحویل">
                        <ul className="space-y-3">
                            {service.deliverables.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircleIcon className="w-5 h-5 text-green-500 me-3 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </ContentCard>
                )}
              </div>
              
              <div className="lg:col-span-2 space-y-8 lg:sticky lg:top-24 self-start">
                  {service.keyBenefits && service.keyBenefits.length > 0 && (
                      <ContentCard title="مزایای کلیدی">
                          <ul className="space-y-3 text-sm">
                              {service.keyBenefits.map((benefit, index) => (
                                  <li key={index} className="flex items-start">
                                      <CheckCircleIcon className="w-4 h-4 text-purple-500 me-2 mt-0.5 flex-shrink-0" />
                                      <span>{benefit}</span>
                                  </li>
                              ))}
                          </ul>
                      </ContentCard>
                  )}
                  
                  {service.idealFor && (
                      <ContentCard title="ایده‌آل برای:" Icon={UserGroupIcon}>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{service.idealFor}</p>
                      </ContentCard>
                  )}
              </div>
            </div>
        </div>

        {relatedServices.length > 0 && (
            <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-center">سرویس‌های مرتبط</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedServices.map(related => (
                        <RelatedServiceCard key={related.id} service={related} />
                    ))}
                </div>
            </section>
        )}

        <section className="mt-8 p-8 bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-black dark:text-white">آماده شروع هستید؟</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                به زودی می توانید با استفاده از فرم هوشمند، درخواست خود را برای این سرویس ثبت کنید.
            </p>
            <button disabled className="mt-6 inline-block bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-8 py-3 rounded-md cursor-not-allowed">
                به زودی...
            </button>
        </section>
    </article>
  );
};

// --- Sub-components for the new layout ---

interface InfoCardProps {
    Icon: React.FC<{ className?: string }>;
    label: string;
    value: string;
}
const InfoCard: React.FC<InfoCardProps> = ({ Icon, label, value }) => (
    <div className="flex items-center p-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md me-4">
            <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </div>
        <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
            <p className="font-bold font-mono text-sm">{value}</p>
        </div>
    </div>
);

interface ContentCardProps {
    title: string;
    Icon?: React.FC<{ className?: string }>;
    children: React.ReactNode;
}
const ContentCard: React.FC<ContentCardProps> = ({ title, Icon, children }) => (
    <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="flex items-center mb-4">
            {Icon && <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 me-2" />}
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {children}
    </div>
);


export default ServiceDetailPage;
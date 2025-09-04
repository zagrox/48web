
export type ServiceCategory = 
  'استراتژی و هویت برند' | 
  'طراحی و تولیدات خلاق' |
  'توسعه وب‌سایت و فروشگاه آنلاین' |
  'توسعه اپلیکیشن موبایل' |
  'محتوا و شبکه‌های اجتماعی' |
  'تبلیغات دیجیتال و سئو' |
  'زیرساخت فنی و سازمانی' |
  'تحلیل، بهینه‌سازی و رشد';

export type ServiceTier = 'Basic' | 'Pro';

export interface MethodologyStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: number;
  category: ServiceCategory;
  name: string;
  originalName: string;
  slogan: string;
  description: string;
  tier: ServiceTier;
  hasOffer?: boolean;

  // New detailed fields
  keyBenefits?: string[];
  methodology?: MethodologyStep[];
  deliverables?: string[];
  idealFor?: string;
  requiredInputs?: string[];
  pricingModel?: string;
  estimatedTimeline?: string;
  relatedServices?: number[];
}
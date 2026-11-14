import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE, SPECIAL_OFFER_IMAGE } from '../data/products';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/common/SafeImage';

export const AboutPage: React.FC = () => {
  const { navigate } = useStore();

  const pillars = [
    {
      number: '01.',
      title: 'Material Integrity',
      description:
        'From traceable merino wool and Italian box calfskin to cold-pressed botanical oils, every piece begins with enduring natural origins.',
    },
    {
      number: '02.',
      title: 'Quiet Architecture',
      description:
        'We design across clothing, carryalls, audio hardware, and living objects with one cohesive visual language—restrained, balanced, and tactile.',
    },
    {
      number: '03.',
      title: 'Considered Production',
      description:
        'Small-batch partner workshops ensure fair artisan wages, minimal packaging waste, and garments engineered for years rather than weeks.',
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-20">
      {/* Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6 space-y-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862]">
            Our Atelier
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#141414] leading-[1.1]">
            Crafted for Calm, Intentional Living.
          </h1>
          <p className="text-base text-[#6E6862] leading-relaxed">
            Founded on the belief that everyday objects deserve the same care as
            bespoke tailoring, ZYRAA unites fashion, leather craftsmanship, clean
            skincare, and modern lifestyle essentials under one refined house.
          </p>
          <p className="text-base text-[#6E6862] leading-relaxed">
            Our signature palette—ivory, warm travertine beige, soft blush, and
            obsidian black—reflects a dedication to pieces that outlast fleeting
            seasonal noise.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('shop', { category: 'All' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors cursor-pointer"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 aspect-[4/3] rounded-lg overflow-hidden border border-[#E6DDD0] bg-[#F3ECE2]">
          <SafeImage
            src={HERO_IMAGE}
            alt="ZYRAA Atelier studio"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-[#E6DDD0] pt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="bg-white border border-[#E6DDD0] rounded-lg p-7 space-y-3"
          >
            <span className="font-serif text-xl font-semibold text-[#C89D8E]">
              {pillar.number}
            </span>
            <h2 className="font-serif text-2xl font-semibold text-[#141414]">
              {pillar.title}
            </h2>
            <p className="text-sm text-[#6E6862] leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </section>

      {/* Visual Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 bg-[#F3ECE2] border border-[#E6DDD0] rounded-lg overflow-hidden items-stretch">
        <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto min-h-[300px]">
          <SafeImage
            src={SPECIAL_OFFER_IMAGE}
            alt="Curated ZYRAA materials and objects"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center space-y-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862]">
            Discover Your Style. Shop Your World.
          </p>
          <h2 className="font-serif text-3xl font-semibold text-[#141414]">
            A Complete Wardrobe &amp; Home Sanctuary
          </h2>
          <p className="text-sm text-[#6E6862] leading-relaxed">
            Every category at ZYRAA is curated to converse with the next—from the
            trench coat you wear on morning commutes to the acoustic headphones on
            your desk and ceramic vessels on your console.
          </p>
        </div>
      </section>
    </div>
  );
};

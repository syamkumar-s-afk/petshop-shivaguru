import { site } from "@/lib/site-data";
import { WhatsAppIcon } from "@/components/icons";

export function CtaBanner() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-forest-light p-4.5 sm:p-6 md:flex-row md:items-center md:justify-between md:gap-6 md:p-8">
      <div className="flex items-center gap-3.5 md:gap-6">
        <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
          <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7 text-leaf" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base md:text-xl font-bold text-forest leading-snug">
            Need Help Choosing the Right Pet or Product?
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-gray-600">
            Our experts are here to guide you with personalized recommendations.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center border-t border-gray-200/40 pt-3.5 sm:border-t-0 sm:pt-0">
        <a
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-forest/90 active:scale-[0.98] cursor-pointer"
          href={site.whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          <span>Chat on WhatsApp</span> 
        </a>
      </div>
    </section>
  );
}

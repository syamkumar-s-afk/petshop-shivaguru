import { site } from "@/lib/site-data";
import { WhatsAppIcon } from "@/components/icons";

export function CtaBanner() {
  return (
    <section className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-forest-light p-6 md:flex-row md:p-8">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
          <WhatsAppIcon className="h-8 w-8 text-leaf" />
        </div>
        <div>
          <h2 className="mb-1 text-xl font-bold text-forest md:text-2xl">
            Need Help Choosing the Right Pet or Product?
          </h2>
          <p className="text-sm text-gray-600">
            Our experts are here to guide you with personalized recommendations.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-4 border-t border-gray-200/60 pt-4 sm:flex-row md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <div className="text-center sm:text-left">
          <p className="mb-1 text-sm text-gray-500">Chat with us on WhatsApp</p>
          <p className="text-xl font-bold text-forest">{site.phone}</p>
        </div>
        <a
          className="flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-medium text-white transition-colors hover:bg-forest/90"
          href={site.whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp Us
        </a>
      </div>
    </section>
  );
}

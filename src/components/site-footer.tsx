import { Clock, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "@/components/icons";
import { footerColumns, site } from "@/lib/site-data";
import { AnimatedLogo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-8 md:mt-12 border-t-[6px] border-leaf bg-forest px-4 pb-6 pt-8 md:pb-8 md:pt-16 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 md:mb-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 md:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-3 md:mb-4 flex items-center gap-3 group cursor-pointer">
              <AnimatedLogo className="h-9 w-9 md:h-10 md:w-10" />
              <span className="flex flex-col">
                <span className="text-base md:text-lg font-bold leading-tight transition-colors group-hover:text-leaf">{site.name}</span>
                <span className="text-[10px] md:text-xs leading-tight text-gray-300">{site.suffix}</span>
              </span>
            </div>
            <p className="mb-4 md:mb-6 text-xs md:text-sm leading-relaxed text-gray-300">
              Your one-stop destination for exotic pets, food, accessories & expert care in
              Pollachi.
            </p>
            <div className="flex gap-2.5 md:gap-3">
              {[
                { label: "Facebook", icon: FacebookIcon },
                { label: "Instagram", icon: InstagramIcon },
                { label: "YouTube", icon: YoutubeIcon },
              ].map(({ label, icon: Icon }) => (
                <a
                  aria-label={label}
                  className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full border border-gray-500 text-gray-300 transition-colors hover:border-leaf hover:bg-leaf hover:text-white"
                  href="#"
                  key={label}
                >
                  <Icon className="h-3 w-3 md:h-3.5 md:w-3.5" />
                </a>
              ))}
              <a
                aria-label="WhatsApp"
                className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full border border-gray-500 text-gray-300 transition-colors hover:border-leaf hover:bg-leaf hover:text-white"
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="col-span-1">
              <h3 className="mb-2 md:mb-4 font-bold text-white text-sm md:text-base">{column.title}</h3>
              <ul className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm text-gray-300">
                {column.links.map((link) => (
                  <li key={link}>
                    <a className="transition-colors hover:text-leaf" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-2 md:mb-4 font-bold text-white text-sm md:text-base">Contact Info</h3>
            <ul className="flex flex-col gap-2.5 md:gap-4 text-xs md:text-sm text-gray-300">
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-leaf" />
                <a className="transition-colors hover:text-white" href={site.phoneHref}>
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-leaf" />
                <span>
                  Kannaki Street,
                  <br />
                  Mahalingapuram, Pollachi
                </span>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-leaf" />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-700/50 pt-4 md:pt-6 text-[10px] md:text-xs text-gray-400 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start text-center md:text-left">
            <p>Copyright 2026 Exotic Pets World Pollachi. All rights reserved.</p>
            <p>Made with care for pets and their people.</p>
          </div>
          <div className="mt-2 md:mt-0">
            <a
              href="https://www.blitzsolutions.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.03] active:scale-[0.98] border border-gray-150"
            >
              <span className="text-gray-500 font-medium text-[10px] md:text-xs">Designed & Developed by</span>
              <img
                src="/images/blitz-logo-clean.png"
                alt="Blitz Solutions Logo"
                className="h-3.5 md:h-4 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

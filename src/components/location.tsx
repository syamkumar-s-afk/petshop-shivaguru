import { site } from "@/lib/site-data";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export function Location() {
  const directionsUrl = "https://maps.app.goo.gl/2MjMEFUSjuLpDGeE8";

  return (
    <section className="mb-16 md:mb-24" id="contact">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full bg-forest-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest">
          Find Us
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-forest md:text-5xl">
          Visit Our Store
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-gray-500 md:text-lg">
          Come experience our collection of premium pets and products in person at our Pollachi branch.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Contact Info Cards */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Unified Contact Details Card */}
          <div className="rounded-2xl border border-gray-150 bg-white p-4.5 sm:p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              {/* Address Row */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-light text-forest">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Address</h3>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold text-forest leading-relaxed">
                    {site.address}
                  </p>
                </div>
              </div>

              {/* Thin divider */}
              <div className="h-px w-full bg-gray-100/80" />

              {/* Phone Row */}
              <a href={site.phoneHref} className="flex items-start gap-3.5 group cursor-pointer">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-light text-forest group-hover:bg-forest group-hover:text-white transition-colors duration-250">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone</h3>
                  <span className="mt-0.5 block text-xs sm:text-sm font-bold text-leaf group-hover:text-forest transition-colors leading-relaxed">
                    {site.phone}
                  </span>
                </div>
              </a>

              {/* Thin divider */}
              <div className="h-px w-full bg-gray-100/80" />

              {/* Working Hours Row */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-light text-forest">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Working Hours</h3>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold text-forest leading-relaxed">
                    {site.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button: Get Directions */}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 rounded-full bg-forest py-3 px-5 text-center text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-leaf hover:shadow-lg active:scale-[0.98] cursor-pointer"
          >
            <Navigation className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Get Directions on Google Maps</span>
          </a>
        </div>

        {/* Map Container */}
        <div className="group relative h-[240px] xs:h-[280px] sm:h-[350px] overflow-hidden rounded-3xl border border-gray-150 bg-white p-2 shadow-sm transition-all duration-500 hover:shadow-xl lg:col-span-7 lg:h-[480px]">
          <div className="h-full w-full overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.8906217867884!2d77.00741807390649!3d10.665597361230498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba839004e475e55%3A0xfdac8490b6880b0b!2sExotic%20pets%20world%20Pollachi!5e0!3m2!1sen!2sin!4v1779950322486!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Exotic Pets World Pollachi Map Location"
              className="grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

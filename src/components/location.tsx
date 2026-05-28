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
        <div className="flex flex-col gap-5 lg:col-span-5 justify-between">
          <div className="grid gap-5">
            {/* Address Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-150 bg-white p-6 shadow-sm transition-all duration-300 hover:border-forest/20 hover:shadow-md">
              <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-forest to-leaf opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-light text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Address</h3>
                  <p className="mt-1.5 text-base font-semibold text-forest leading-relaxed">
                    {site.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <a
              href={site.phoneHref}
              className="group relative overflow-hidden rounded-2xl border border-gray-150 bg-white p-6 shadow-sm transition-all duration-300 hover:border-forest/20 hover:shadow-md"
            >
              <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-forest to-leaf opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-light text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Phone</h3>
                  <span className="mt-1.5 block text-lg font-bold text-leaf group-hover:text-forest transition-colors">
                    {site.phone}
                  </span>
                </div>
              </div>
            </a>

            {/* Working Hours Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-150 bg-white p-6 shadow-sm transition-all duration-300 hover:border-forest/20 hover:shadow-md">
              <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-forest to-leaf opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-light text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Working Hours</h3>
                  <p className="mt-1.5 text-base font-semibold text-forest leading-relaxed">
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
            className="group flex items-center justify-center gap-2.5 rounded-2xl bg-forest py-4 px-6 text-center font-bold text-white shadow-md transition-all duration-300 hover:bg-leaf hover:shadow-lg active:scale-[0.98]"
          >
            <Navigation className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Get Directions on Google Maps</span>
          </a>
        </div>

        {/* Map Container */}
        <div className="group relative h-[350px] overflow-hidden rounded-3xl border border-gray-150 bg-white p-2 shadow-sm transition-all duration-500 hover:shadow-xl lg:col-span-7 lg:h-[480px]">
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

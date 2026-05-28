import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Pet Parent",
    content: "Excellent variety of exotic pets and the staff is very knowledgeable. They guided me perfectly when I brought home my first Macaw.",
    rating: 5,
  },
  {
    name: "Priya S.",
    role: "Aquarium Enthusiast",
    content: "The best place in Pollachi for aquarium setup and supplies. The neon tetras I bought are very healthy and active.",
    rating: 5,
  },
  {
    name: "Karthik Raj",
    role: "Dog Owner",
    content: "I regularly buy premium dog food from here. They always have the best brands in stock and offer great customer service.",
    rating: 5,
  },
];

export function Testimonial() {
  return (
    <section className="mb-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-forest md:text-4xl">Happy Customers</h2>
        <p className="mt-2 text-gray-600">Hear what our lovely pet parents have to say about us.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div>
              <div className="mb-4 flex gap-1 text-yellow-400">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mb-6 text-gray-600 leading-relaxed">&quot;{testimonial.content}&quot;</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-light font-bold text-forest">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-forest">{testimonial.name}</h4>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

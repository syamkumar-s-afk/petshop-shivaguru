import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ramesh Kumar",
    content: "Excellent variety of exotic pets and the staff is very knowledgeable. They guided me perfectly when I brought home my first Macaw.",
    rating: 5,
  },
  {
    name: "Priya S.",
    content: "The best place in Pollachi for aquarium setup and supplies. The neon tetras I bought are very healthy and active.",
    rating: 5,
  },
  {
    name: "Karthik Raj",
    content: "I regularly buy premium dog food from here. They always have the best brands in stock and offer great customer service.",
    rating: 5,
  },
  {
    name: "Anjali Devi",
    content: "Outstanding customer support! I ordered some premium puppy feeds and active accessories, and they arrived perfectly packaged.",
    rating: 5,
  },
  {
    name: "Siddharth R.",
    content: "Highly impressed by their aquarium fish collection and water care guides. The expert advice made setting up my tank extremely easy.",
    rating: 5,
  },
  {
    name: "Vikram Shah",
    content: "The best spot for premium vet-approved puppy supplements in Pollachi. My retriever puppy is growing extremely healthy and active.",
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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md hover:border-forest/10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-light font-bold text-forest text-xs">
                {testimonial.name.charAt(0)}
              </div>
              <h4 className="font-bold text-sm text-gray-900 leading-tight">{testimonial.name}</h4>
              <div className="flex gap-0.5 text-yellow-400 ml-auto">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-600 font-medium italic">&quot;{testimonial.content}&quot;</p>
          </div>
        ))}
      </div>
    </section>
  );
}

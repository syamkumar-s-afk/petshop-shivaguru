export function ProductSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-xl md:rounded-2xl shadow-sm border border-neutral-100 overflow-hidden min-w-[120px] w-[30vw] max-w-[140px] md:min-w-[240px] md:max-w-[300px] md:w-full animate-pulse snap-start">
      <div className="aspect-square bg-neutral-200" />
      <div className="p-2 md:p-3 flex flex-col justify-between flex-grow">
        <div className="flex flex-col gap-1 md:gap-1.5">
          {/* Title */}
          <div className="w-full h-3 md:h-4 bg-neutral-200 rounded" />
          <div className="w-2/3 h-3 md:h-4 bg-neutral-200 rounded" />
        </div>

        {/* Price */}
        <div className="w-12 md:w-20 h-4 md:h-5 bg-neutral-200 rounded mt-2 md:mt-3" />
      </div>
    </div>
  );
}

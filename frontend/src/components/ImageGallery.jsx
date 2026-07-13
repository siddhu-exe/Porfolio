/**
 * Data-driven image slot used by every Chapter-page gallery section.
 *  - 1 image  -> full-width single frame
 *  - 2 images -> side-by-side grid, generous gutter
 *  - 3+ images -> horizontal scroll-snap row, with a fade hint on the right
 *    edge so it reads as scrollable
 * All frames share the same soft, all-corners rounded treatment.
 */
export default function ImageGallery({ images = [], color, alt }) {
  if (images.length === 0) return null;

  const Frame = ({ src, label, className = '' }) => (
    <div
      className={`overflow-hidden rounded-3xl border border-ink/10 shadow-sm ${className}`}
      style={{ backgroundColor: color }}
    >
      {src ? (
        <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-6 py-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cream/90">{label}</span>
        </div>
      )}
    </div>
  );

  if (images.length === 1) {
    return (
      <div className="aspect-[16/9] w-full">
        <Frame src={images[0]} label={alt} className="h-full w-full" />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {images.map((src, i) => (
          <div key={i} className="aspect-[4/3]">
            <Frame src={src} label={`${alt} ${i + 1}`} className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  // 3+ images: horizontal scroll-snap gallery with a fade-edge scroll hint.
  return (
    <div className="relative">
      <div className="scrollbar-none flex gap-5 overflow-x-auto pb-2 [scroll-snap-type:x_mandatory]">
        {images.map((src, i) => (
          <div
            key={i}
            className="aspect-[4/3] w-[78%] shrink-0 sm:w-[46%] md:w-[38%]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <Frame src={src} label={`${alt} ${i + 1}`} className="h-full w-full" />
          </div>
        ))}
      </div>
      {/* fade hint signalling more content off the right edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent" />
    </div>
  );
}

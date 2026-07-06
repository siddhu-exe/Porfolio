/**
 * Two vertical hairlines framing the whole site, fixed so they persist
 * across every section (including the black Project Shelf). The mid-gray
 * tone reads as a low-opacity black line on cream and stays visible on black.
 */
export default function FrameLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <div className="absolute bottom-0 top-0 left-4 w-px bg-neutral-500/40 md:left-10" />
      <div className="absolute bottom-0 top-0 right-4 w-px bg-neutral-500/40 md:right-10" />
    </div>
  );
}

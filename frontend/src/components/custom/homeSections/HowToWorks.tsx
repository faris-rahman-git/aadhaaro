
function HowToWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-base font-medium">1. Upload images</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add the front and back images of the Aadhaar card. Clear,
            high-resolution photos work best.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-base font-medium">2. Run OCR</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Start the OCR process and track progress for each image in real
            time.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-base font-medium">3. Review results</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            View extracted fields in an organized layout, with raw OCR text
            available for verification.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowToWorks;

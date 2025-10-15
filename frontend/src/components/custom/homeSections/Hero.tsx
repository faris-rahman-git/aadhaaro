
function Hero() {
  return (
    <section className="w-full border-b bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-balance text-4xl font-semibold md:text-5xl">
          Extract Aadhaar details in seconds
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground md:text-lg">
          Upload the front and back of an Aadhaar card, run OCR, and view the
          extracted information in a clean layout.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="#upload"
            className="inline-flex items-center justify-center rounded-md border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Get started
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;

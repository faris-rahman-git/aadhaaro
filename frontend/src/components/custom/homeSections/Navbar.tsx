import logo from "@/assets/logo.png";

function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl h-20 items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Aadhaar OCR logo" className="size-13" />
          <span className="text-4xl font-bold tracking-wide">Aadhaaro</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="#how-it-works"
            className="hover:text-foreground transition-colors"
          >
            How it works
          </a>
          <a href="#upload" className="hover:text-foreground transition-colors">
            Upload
          </a>
          <a
            href="#results"
            className="hover:text-foreground transition-colors"
          >
            Results
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

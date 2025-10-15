import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AadhaarOCR from "@/components/custom/AadhaarOCR";
import Navbar from "@/components/custom/homeSections/Navbar";
import Hero from "@/components/custom/homeSections/Hero";
import HowToWorks from "@/components/custom/homeSections/HowToWorks";
import Footer from "@/components/custom/homeSections/Footer";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col">
      <Navbar />

      <Hero />

      <HowToWorks />

      {/* Upload & Extract */}
      <section id="upload" className="mx-auto w-full max-w-6xl px-6 pb-12">
        <Card>
          <CardHeader>
            <CardTitle>Upload & Extract</CardTitle>
            <p className="text-sm text-muted-foreground">
              Tip: For best accuracy, use well-lit, straight, and sharp images
              of both front and back.
            </p>
          </CardHeader>
          <CardContent>
            <AadhaarOCR />
          </CardContent>
        </Card>
      </section>

      <div id="results" />

      <Footer />
    </main>
  );
}

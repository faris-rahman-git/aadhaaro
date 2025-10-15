import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useScanDoc } from "@/hooks/useScanDoc";
import Loader from "./Loader";

type ResultType = {
  details: {
    name: string;
    aadhaarNumber: string;
    dob: string;
    gender: string;
    address: string;
    pincode: string;
  };
  isAadhaarValid: boolean;
  reason: string;
};

export default function AadhaarOCR() {
  const [frontFile, setFrontFile] = React.useState<File | null>(null);
  const [backFile, setBackFile] = React.useState<File | null>(null);
  const [frontPreview, setFrontPreview] = React.useState<string | null>(null);
  const [backPreview, setBackPreview] = React.useState<string | null>(null);

  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<ResultType | null>(null);

  const frontInputRef = React.useRef<HTMLInputElement>(null);
  const backInputRef = React.useRef<HTMLInputElement>(null);

  const {
    isPending,
    isSuccess,
    isError,
    error: scanError,
    data: scanData,
    mutate,
  } = useScanDoc();

  React.useEffect(() => {
    return () => {
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      if (backPreview) URL.revokeObjectURL(backPreview);
    };
  }, [frontPreview, backPreview]);

  function onFrontChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setFrontFile(file);
    if (frontPreview) URL.revokeObjectURL(frontPreview);
    setFrontPreview(file ? URL.createObjectURL(file) : null);
  }

  function onBackChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setBackFile(file);
    if (backPreview) URL.revokeObjectURL(backPreview);
    setBackPreview(file ? URL.createObjectURL(file) : null);
  }

  function handleFrontClick() {
    frontInputRef.current?.click();
  }

  function handleBackClick() {
    backInputRef.current?.click();
  }

  function removeFront() {
    setFrontFile(null);
    if (frontPreview) URL.revokeObjectURL(frontPreview);
    setFrontPreview(null);
  }

  function removeBack() {
    setBackFile(null);
    if (backPreview) URL.revokeObjectURL(backPreview);
    setBackPreview(null);
  }

  function onDropFront(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      setFrontFile(file);
      setFrontPreview(URL.createObjectURL(file));
    }
  }

  function onDropBack(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (backPreview) URL.revokeObjectURL(backPreview);
      setBackFile(file);
      setBackPreview(URL.createObjectURL(file));
    }
  }

  const handleScan = () => {
    if (!frontFile || !backFile) {
      setError("Please upload both front and back images.");
      return;
    }

    const formData = new FormData();
    formData.append("front", frontFile);
    formData.append("back", backFile);
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setError(null);
      console.log(scanData);
      setData(scanData.data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(scanError)) {
        setData(null);
        setError(scanError.response?.data?.message);
      }
    } else {
      setError(null);
    }
  }, [isError]);

  return (
    <div className="space-y-8">
      {(error || !data?.isAadhaarValid) && (
        <div className="rounded-md border p-3 text-destructive-foreground text-red-600 text-center">
          {!data?.isAadhaarValid ? data?.reason : error}
        </div>
      )}
      {/* Upload */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Front */}
        <div className="space-y-2">
          <Label htmlFor="front" className="sr-only">
            Front side image
          </Label>
          <input
            ref={frontInputRef}
            id="front"
            type="file"
            accept="image/*"
            onChange={onFrontChange}
            className="sr-only"
          />
          {!frontPreview ? (
            <div
              onClick={handleFrontClick}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDropFront}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && handleFrontClick()
              }
              className="group flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-muted/40 text-center transition-colors hover:bg-muted"
              aria-label="Upload front side image"
            >
              <div className="text-sm font-medium">Upload front side</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Click to choose or drag & drop
              </div>
            </div>
          ) : (
            <figure className="rounded-md border bg-card p-2">
              <img
                src={frontPreview}
                alt="Aadhaar card front preview"
                className="h-48 w-full rounded-md object-contain bg-muted"
                crossOrigin="anonymous"
              />
              <figcaption className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Front preview
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleFrontClick}
                  >
                    Change
                  </Button>
                  <Button variant="outline" size="sm" onClick={removeFront}>
                    Remove
                  </Button>
                </div>
              </figcaption>
            </figure>
          )}
        </div>

        {/* Back */}
        <div className="space-y-2">
          <Label htmlFor="back" className="sr-only">
            Back side image
          </Label>
          <input
            ref={backInputRef}
            id="back"
            type="file"
            accept="image/*"
            onChange={onBackChange}
            className="sr-only"
          />
          {!backPreview ? (
            <div
              onClick={handleBackClick}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDropBack}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && handleBackClick()
              }
              className="group flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-muted/40 text-center transition-colors hover:bg-muted"
              aria-label="Upload back side image"
            >
              <div className="text-sm font-medium">Upload back side</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Click to choose or drag & drop
              </div>
            </div>
          ) : (
            <figure className="rounded-md border bg-card p-2">
              <img
                src={backPreview || "/placeholder.svg"}
                alt="Aadhaar card back preview"
                className="h-48 w-full rounded-md object-contain bg-muted"
                crossOrigin="anonymous"
              />
              <figcaption className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Back preview
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleBackClick}
                  >
                    Change
                  </Button>
                  <Button variant="outline" size="sm" onClick={removeBack}>
                    Remove
                  </Button>
                </div>
              </figcaption>
            </figure>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleScan}
          disabled={!(frontFile && backFile) || isPending}
        >
          {isPending ? "Scanning..." : "Scan Aadhaar"}
        </Button>
        {isPending && <Loader />}
        <p className="text-sm text-muted-foreground">
          Use clear, flat, and well-lit images for best accuracy.
        </p>
      </div>

      {/* Results */}
      {!error && data?.isAadhaarValid && data && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Extracted Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Aadhaar Number
                  </dt>
                  <dd className="text-sm">{data.details.aadhaarNumber || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Name</dt>
                  <dd className="text-sm">{data.details.name || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Date of Birth
                  </dt>
                  <dd className="text-sm">{data.details.dob || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Gender</dt>
                  <dd className="text-sm">{data.details.gender || "—"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-muted-foreground">Address</dt>
                  <dd className="text-sm">{data.details.address || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Pincode</dt>
                  <dd className="text-sm">{data.details.pincode || "—"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Raw Api text */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Response</CardTitle>
              </CardHeader>
              <CardContent>
                <details>
                  <summary className="cursor-pointer text-sm">
                    Show text
                  </summary>
                  <pre className="mt-3 max-h-80 overflow-auto rounded-md border bg-muted p-3 text-sm leading-relaxed whitespace-pre-wrap">
                    {data
                      ? JSON.stringify(data, null, 2)
                      : "No data yet. Run OCR to extract details."}
                  </pre>
                </details>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

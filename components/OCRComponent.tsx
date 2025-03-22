import { useState } from "react";
import { Button } from "@/components/ui/button";

const OCRComponent = ({ onTextExtracted }: { onTextExtracted: (text: string) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the image.");
      }

      const data = await response.json();
      setExtractedText(data.text);
      onTextExtracted(data.text); // Pass extracted text to parent component
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={isProcessing} />
      <Button onClick={handleUpload} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Upload and Extract Text"}
      </Button>
      {extractedText && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Extracted Text</h4>
          <p className="text-sm text-gray-700">{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default OCRComponent;
"use client";
import { Icon, loadIcons } from "@iconify/react";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { DNA } from "react-loader-spinner";
import { useAnalysis } from "../context/AnalysisContext";

export default function ImageDropzone() {
  loadIcons(["mage:image", "mage:image-upload"]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  // const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const { isAnalyzing, setIsAnalyzing, setAnalysisResult } = useAnalysis(); // Assuming you have a context or state management for this

  // I'd handle error states such that when a user's image is too large or not the right format, an error message is displayed. This could be done using a state variable to track the error and conditionally render an error message in the UI.

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      // Create a preview URL for the image
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  }, []);

  // Clean up the object URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
  });

  const handleAnalysis = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnalyzing(true);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const basic = {
    confidence: "0.99",
    prediction: "Eczema",
    recommedation:
      "Use a moisturizer to keep the skin hydrated. Avoid scratching the affected area.",
  };

  return (
    <div
      {...getRootProps()}
      className={`max-w-[740px] w-full mx-auto my-10 p-6 border-2 border-neutral text-neutral border-dashed rounded-3xl ${
        isDragActive ? "bg-base-300" : "bg-base-200"
      } transition-colors duration-200 h-96 flex justify-center items-center font-[family-name:var(--font-work-sans)]`}
    >
      <input {...getInputProps()} />

      {preview ? (
        <div className="flex flex-col items-center gap-y-4">
          <div className="relative w-full max-h-64 flex items-center justify-center">
            {isAnalyzing && (
              <div className="absolute flex justify-center items-center z-10 rounded-lg inset-0 bg-base-200/30">
                <DNA
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </div>
            )}
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 max-w-full object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-x-3 max-w-[400px]">
            {!isAnalyzing && (
              <button
                className="btn btn-neutral"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setPreview(null);
                }}
              >
                Remove
              </button>
            )}
            <button
              className={`btn btn-primary ${isAnalyzing && "w-full"}`}
              onClick={handleAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <span className="loading loading-infinity loading-sm" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-y-4">
          <Icon
            icon={isDragActive ? "mage:image" : "mage:image-upload"}
            className={`size-14 ${
              isDragActive && "-rotate-12"
            } duration-300 transition-transform`}
          />

          {isDragActive ? (
            <p className="font-bold text-base">Drop image here!</p>
          ) : (
            <>
              <div className="block text-center space-y-1">
                <h2 className="font-bold text-base">Drop an image or browse</h2>
                <p className="text-neutral/70">
                  Format: .jpeg, .png & Max file size: 5 MB
                </p>
              </div>
              <button className="btn btn-neutral w-fit font-normal">
                Browse images
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

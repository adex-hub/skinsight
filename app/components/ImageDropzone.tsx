"use client";
import { Icon, loadIcons } from "@iconify/react";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageDropzone() {
  loadIcons(["mage:image", "mage:image-upload"]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  return (
    <div
      {...getRootProps()}
      className={`max-w-[740px] w-full mx-auto mt-10 p-6 border-2 border-neutral text-neutral border-dashed rounded-3xl ${
        isDragActive ? "bg-base-300" : "bg-base-200"
      } transition-colors duration-200 h-96 flex justify-center items-center font-[family-name:var(--font-work-sans)]`}
    >
      <input {...getInputProps()} />

      {preview ? (
        <div className="flex flex-col items-center gap-y-4">
          <div className="relative w-full max-h-64 flex items-center justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 max-w-full object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-x-3">
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
            <button className="btn btn-primary">Analyze Image</button>
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

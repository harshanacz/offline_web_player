"use client";

import { FileVideo, Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg'],
      'audio/*': ['.mp3', '.wav']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-neutral-700 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-neutral-500"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 rounded-full bg-neutral-800">
          {isDragActive ? (
            <Upload className="w-10 h-10 text-neutral-400" />
          ) : (
            <FileVideo className="w-10 h-10 text-neutral-400" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-white">
            {isDragActive ? "Drop your media file here" : "Upload your media file"}
          </h3>
          <p className="text-sm text-neutral-400">
            Drag and drop your video or audio file, or click to select
          </p>
        </div>
        <Button variant="secondary" className="mt-4">
          Select File
        </Button>
      </div>
    </div>
  );
}
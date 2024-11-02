"use client";

import { VideoPlayer } from "@/components/video-player";
import { FileUpload } from "@/components/file-upload";
import { useState } from "react";
import { Layout } from "@/components/layout";

export default function Home() {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>("");

  const handleFileSelect = (file: File) => {
    if (mediaUrl) {
      URL.revokeObjectURL(mediaUrl);
    }
    setMediaFile(file);
    setMediaUrl(URL.createObjectURL(file));
  };

  return (
    <Layout>
      {!mediaFile ? (
        <FileUpload onFileSelect={handleFileSelect} />
      ) : (
        <VideoPlayer src={mediaUrl} fileName={mediaFile.name} />
      )}
    </Layout>
  );
}
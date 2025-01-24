import { useDropzone } from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { FC, useCallback } from "react";

type DropzoneProps = {
  type: string;
  onFinished: (files: File[]) => void;
};

export const Dropzone: FC<DropzoneProps> = ({ type, onFinished }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFinished(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { [type]: [] },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-primary-500 p-6 rounded-lg cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <PhotoIcon className="h-12 w-12 text-primary-500" />
        <input {...getInputProps()} className="hidden" />
      </div>
    </div>
  );
};

import { useDropzone } from "react-dropzone";
import { 
  PhotoIcon, 
  DocumentIcon, 
  CloudArrowUpIcon 
} from "@heroicons/react/24/outline";
import { FC, useCallback } from "react";

type DropzoneProps = {
  type: string;
  onFinished: (files: File[]) => void;
  text?: string;
};

export const Dropzone: FC<DropzoneProps> = ({ type, onFinished, text }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFinished(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { [type]: [] },
    onDrop,
  });

  const getIcon = () => {
    if (type.startsWith('image/')) {
      return <PhotoIcon className="h-12 w-12 text-primary-500" />;
    }
    if (type.startsWith('application/')) {
      return <DocumentIcon className="h-12 w-12 text-primary-500" />;
    }
    return <CloudArrowUpIcon className="h-12 w-12 text-primary-500" />;
  };

  const getDefaultText = () => {
    if (type.startsWith('image/')) {
      return "Glissez-déposez une image ou cliquez pour en sélectionner une";
    }
    if (type.startsWith('application/')) {
      return "Glissez-déposez un document ou cliquez pour en sélectionner un";
    }
    return "Glissez-déposez un fichier ou cliquez pour en sélectionner un";
  };

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-primary-500 p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex flex-col items-center justify-center h-full space-y-2">
        {getIcon()}
        <p className="text-sm text-gray-600 text-center">
          {text || getDefaultText()}
        </p>
        <input {...getInputProps()} className="hidden" />
      </div>
    </div>
  );
};

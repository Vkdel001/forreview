// components/DocumentUploader.tsx
import React from 'react';
import { Upload, Trash2 } from 'lucide-react';

interface FileUpload {
  id: string;
  file: File;
  name: string;
}

interface Props {
  label: string;
  description: string;
  icon: React.ReactNode;
  files: FileUpload[];
  onAdd: (files: FileList) => void;
  onRemove: (fileId: string) => void;
  allowedFormats: string[];
}

const DocumentUploader: React.FC<Props> = ({
  label,
  description,
  icon,
  files,
  onAdd,
  onRemove,
  allowedFormats
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
        {icon}
        <span>{label} *</span>
      </label>
      <div className="bg-blue-50 p-2 rounded-md mb-3">
        <p className="text-xs text-blue-700">{description}</p>
      </div>
      <div className="space-y-2">
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept={allowedFormats.join(',')}
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                onAdd(e.target.files);
              }
            }}
          />
          <div className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-red-400 hover:bg-red-50 transition-all duration-200">
            <Upload className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">Upload Documents</span>
          </div>
        </label>
        {files.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between bg-white p-2 rounded border">
            <span className="text-sm text-gray-700 truncate flex-1">{doc.name}</span>
            <button
              type="button"
              onClick={() => onRemove(doc.id)}
              className="ml-2 text-red-600 hover:text-red-800 p-1"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentUploader;

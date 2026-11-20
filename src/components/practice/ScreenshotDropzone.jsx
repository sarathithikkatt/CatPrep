import React, { useRef } from 'react';
import { UploadCloud, Trash2 } from 'lucide-react';

/**
 * Dropzone for clipboard screenshots and file uploads.
 */
export const ScreenshotDropzone = ({
  imageBase64,
  onImageFile,
  onRemoveImage
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
        Question Screenshot (Clipboard Paste or Drag-and-Drop)
      </label>

      {imageBase64 ? (
        <div className="relative rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/30 p-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <img 
              src={imageBase64} 
              alt="Uploaded Preview" 
              className="w-16 h-16 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div className="truncate">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                Screenshot Captured from Clipboard / File
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold">
                Ready for Gemini OCR & Auto-Solve
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onRemoveImage}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
              title="Remove image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) onImageFile(e.dataTransfer.files[0]);
          }}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-xl p-5 text-center cursor-pointer transition bg-slate-50/50 dark:bg-slate-800/40 group"
        >
          <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 mx-auto mb-2 transition" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Paste mock screenshot (<kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border text-[10px]">Ctrl+V</kbd>) or click to browse
          </p>
          <span className="text-[10px] text-slate-400">
            Supports PNG, JPEG, WebP mock screenshots from IMS, TIME, CL, Cracku
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) onImageFile(e.target.files[0]);
            }}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

"use client";

import { DocumentTemplate } from "@/types/document";

interface DocumentPreviewProps {
  template: DocumentTemplate;
  formData: Record<string, any>;
}

export default function DocumentPreview({
  template,
  formData,
}: DocumentPreviewProps) {
  const isFormValid = template.fields
    .filter((f) => f.required)
    .every(
      (f) =>
        formData && formData[f.id] && formData[f.id].toString().trim() !== ""
    );

  if (!isFormValid) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 h-full">
        <div className="text-center text-gray-400 py-20">
          <p className="text-lg">
            מלא את כל השדות הנדרשים כדי לראות תצוגה מקדימה
          </p>
        </div>
      </div>
    );
  }

  const documentContent = template.template(formData || {});

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 h-full overflow-auto">
      <div className="prose prose-sm max-w-none">
        <pre className="whitespace-pre-wrap font-serif text-right text-gray-800 leading-relaxed">
          {documentContent}
        </pre>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertCircle, RotateCcw, Database } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onUseDemoArchive: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  onUseDemoArchive,
}) => {
  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-stone-200 rounded-2xl text-center shadow-xs">
      <div className="w-12 h-12 rounded-full bg-red-50 text-red-700 mx-auto mb-4 flex items-center justify-center border border-red-200">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
        Archive Search Encountered an Issue
      </h3>

      <p className="text-sm text-stone-600 font-sans leading-relaxed mb-6">
        {message || 'Could not connect to the open image provider. You can retry the connection or view the locally verified demo cultural collection.'}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Search</span>
        </button>

        <button
          onClick={onUseDemoArchive}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors"
        >
          <Database className="w-3.5 h-3.5 text-stone-600" />
          <span>Browse Demo Archive</span>
        </button>
      </div>
    </div>
  );
};

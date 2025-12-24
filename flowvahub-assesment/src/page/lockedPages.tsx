import { Lock } from 'lucide-react';

export const LockedPage = ({ pageName }: { pageName: string }) => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{pageName}</h1>
            <p className="text-gray-600 mb-6">
              This page is currently locked. Complete more tasks to unlock access.
            </p>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 inline-block">
              <p className="text-sm text-purple-700">
                🎯 Visit the Rewards Hub to see how to unlock this page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareStackCardProps {
  points: number;
  onShare: () => void;
}

export const ShareStackCard: React.FC<ShareStackCardProps> = ({ points, onShare }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 
                    transition-all duration-300 ease-out will-change-transform
                    hover:-translate-y-1 hover:shadow-xl
                    hover:border-purple-600 hover:ring-2 hover:ring-purple-200">
      <div className="flex items-center gap-3 py-2.75 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Share2 className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Share Your Stack</h3>
          <p className="text-sm text-gray-600">Earn +{points} pts</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700">Share your tool stack</p>
        <button
          onClick={onShare}
          className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full font-medium hover:bg-purple-600 hover:text-white transition-colors flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
};
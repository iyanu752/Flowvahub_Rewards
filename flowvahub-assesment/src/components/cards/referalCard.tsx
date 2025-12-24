import React from 'react';
import { Star } from 'lucide-react';

interface ReferralCardProps {
  title: string;
  description: string;
  deadline?: string;
}

export const ReferralCard: React.FC<ReferralCardProps> = ({
  title,
  description,
  deadline,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 
                    transition-all duration-300 ease-out will-change-transform
                    hover:-translate-y-1 hover:shadow-xl
                    hover:border-purple-600 hover:ring-2 hover:ring-purple-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Star className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">
        {description}{' '}
        {deadline && (
          <>
            by <span className="font-semibold">{deadline}</span>
          </>
        )}{' '}
        and earn a chance to be one of 5 winners of{' '}
        <span className="font-semibold text-purple-600">10,000 points</span>. Friends must
        complete onboarding to qualify.
      </p>
    </div>
  );
};
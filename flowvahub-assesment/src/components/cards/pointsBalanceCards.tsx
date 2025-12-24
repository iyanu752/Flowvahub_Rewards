import React from 'react';
import { Medal } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PointsBalanceCardProps {
  points: number;
  goalAmount: number;
  totalNeeded: number;
}

export const PointsBalanceCard: React.FC<PointsBalanceCardProps> = ({
  points,
  goalAmount,
  totalNeeded,
}) => {
  const progressPercentage = (points / totalNeeded) * 100;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg  flex items-center justify-center">
          <Medal className=" text-purple-600" />
        </div>
        <h3 className="font-semibold text-gray-900">Points Balance</h3>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="text-5xl font-bold text-purple-600">{points}</div>
        <div className="flex items-center justify-center">
          <span className='w-20 h-20'>
            <DotLottieReact
              src="https://lottie.host/3d3cb627-ef93-4fbe-bd92-e59cfeeb8958/5g97pibqHS.lottie"
              autoplay
            />
          </span>
        </div>
      </div>

      <div className="space-y-2 ">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress to ${goalAmount} Gift Card</span>
          <span className="font-semibold text-gray-900">
            {points}/{totalNeeded}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1 pt-1">
          <span>🚀</span>
          Just getting started — keep earning points!
        </p>
      </div>
    </div>
  );
};
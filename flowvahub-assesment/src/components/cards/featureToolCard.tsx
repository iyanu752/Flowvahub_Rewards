import React from 'react';
import { Users, Gift } from 'lucide-react';

interface FeaturedToolCardProps {
  title: string;
  subtitle: string;
  description: string;
  pointsReward: number;
  onSignup: () => void;
  onClaimPoints: () => void;
  isClaimDisabled?: boolean;
}

export const FeaturedToolCard: React.FC<FeaturedToolCardProps> = ({
  title,
  subtitle,
  description,
  pointsReward,
  onSignup,
  onClaimPoints,
  isClaimDisabled = false,
}) => {
  return (
    <div className="w-full  h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
   
      <div className="bg-linear-to-r from-purple-600 via-purple-500 to-blue-400 p-6 relative flex-shrink-0">
        <span className="inline-block px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-3">
          Featured
        </span>
        
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {title}
            </h2>
            <h3 className="text-xl font-bold text-white">
              {subtitle}
            </h3>
          </div>
          
 
          <div className="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="flex flex-col gap-0.5">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-pink-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
              </div>
              <div className="w-3 h-3 bg-yellow-300 rounded-sm ml-0"></div>
            </div>
          </div>
        </div>
      </div>
      

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex gap-3 mb-6 flex-1">
          <div className="shrink-0">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-900 font-semibold text-base mb-1.5">
              Automate and Optimize Your Schedule
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        

        <div className="flex gap-3">
          <button 
            onClick={onSignup}
            className="flex-1 cursor-pointer bg-linear-to-r from-purple-600 to-purple-500 text-white px-4 py-2.5 rounded-full font-medium hover:from-purple-700 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" />
            Sign up
          </button>
          
          <button 
            onClick={onClaimPoints}
            disabled={isClaimDisabled}
            className="flex-1 cursor-pointer bg-linear-to-r from-pink-500 to-purple-500 text-white px-4 py-2.5 rounded-full font-medium hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Gift className="w-4 h-4" />
            {isClaimDisabled ? 'Already Claimed' : `Claim ${pointsReward} pts`}
          </button>
        </div>
      </div>
    </div>
  );
};
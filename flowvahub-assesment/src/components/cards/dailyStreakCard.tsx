import React from 'react';
import { Calendar, Zap } from 'lucide-react';

interface DailyStreakCardProps {
  currentStreak: number;
  weekDays: boolean[];
  hasClaimed: boolean;
   onClaim: () => Promise<boolean>
}

export const DailyStreakCard: React.FC<DailyStreakCardProps> = ({
  currentStreak,
  weekDays,
  hasClaimed,
  onClaim,
}) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];


  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

      <div className="flex items-center  gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <Calendar className="text-cyan-400" />
        </div>
        <h3 className="font-semibold text-gray-900">Daily Streak</h3>
      </div>

 
      <div className="text-5xl font-bold text-purple-600 mb-6">
        {currentStreak} day{currentStreak !== 1 ? 's' : ''}
      </div>

      {/* Week Days */}
      <div className="flex gap-2 mb-6 flex-1 items-center">
        {days.map((day, index) => {
          const isToday = index === todayIndex;
          const isCompleted = weekDays[index];

          return (
            <div
              key={index}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                transition-all
                ${isCompleted
                  ? 'ring-2 ring-cyan-200 bg-[#70D6FF] scale-90 text-white'
                  : 'bg-gray-100 text-gray-500'}
                ${isToday
                  ? 'ring-2 ring-purple-600 scale-110'
                  : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <p className="text-sm text-gray-600 mb-4">
        Check in daily to earn +5 points
      </p>

      {/* Claim Button */}
      <button
        onClick={onClaim}
        disabled={hasClaimed}
        className={`
          w-full py-3 px-4 rounded-full font-medium flex items-center justify-center gap-2
          transition-colors
          ${hasClaimed
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'}
        `}
      >
        <Zap className="w-4 h-4" />
        {hasClaimed ? 'Claimed Today' : 'Claim +5 Points'}
      </button>
    </div>
  );
};

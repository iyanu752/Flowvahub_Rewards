import React from 'react';
import { X, CheckCircle } from 'lucide-react';

interface StreakSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StreakSuccessModal: React.FC<StreakSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
 
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-[scale-in_0.3s_ease-out]">
      
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

   
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <CheckCircle className="w-24 h-24 text-green-500 relative" strokeWidth={2} />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-purple-600">
            Level Up! 🎉
          </h2>
          
          <div className="text-6xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            +5 Points
          </div>
          
          <div className="flex justify-center gap-2 text-2xl">
            <span>✨</span>
            <span>💎</span>
            <span>🎯</span>
          </div>
          
          <p className="text-gray-600 text-sm">
            You've claimed your daily points! Come back tomorrow for more!
          </p>
        </div>
      </div>
    </div>
  );
}
interface RewardCardProps {
  icon: string;
  title: string;
  description: string;
  points: number;
  status: 'unlocked' | 'locked' | 'coming-soon';
  onRedeem?: () => void;
}


export const RewardCard: React.FC<RewardCardProps> = ({
  icon,
  title,
  description,
  points,
  status,
  onRedeem,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
      <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center mb-4">
        <span className="text-2xl">{icon}</span>
      </div>
      
      <h3 className="font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 min-h-[40px]">{description}</p>
      
      <div className="flex items-center gap-1 mb-4 text-purple-500">
        <span>⭐</span>
        <span className="font-semibold">{points} pts</span>
      </div>
      
      <button
        onClick={onRedeem}
        disabled={status !== 'unlocked'}
        className={`w-full py-2.5 px-4 rounded-sm font-medium transition-colors ${
          status === 'unlocked'
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : status === 'locked'
            ? 'bg-[#d7e0ed] text-white cursor-not-allowed'
            : 'bg-[#d7e0ed] text-white cursor-not-allowed'
        }`}
      >
        {status === 'unlocked' ? 'Unlocked' : status === 'locked' ? 'Locked' : 'Coming Soon'}
      </button>
    </div>
  );
};
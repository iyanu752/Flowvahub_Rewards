import { RewardCard } from "@/components/cards/rewardCard";
import { useState } from "react";

interface RedeemRewardsSectionProps {
  points: number;
}

type RewardStatus = 'locked' | 'unlocked' | 'coming-soon';

interface Reward {
  id: number;
  icon: string;
  title: string;
  description: string;
  points: number;
  status: RewardStatus;
}

export const RedeemRewardsSection: React.FC<RedeemRewardsSectionProps> = ({ points }) => {
  const [rewardFilter, setRewardFilter] = useState<'all' | RewardStatus>('all');

  const rewards: Reward[] = [
    {
      id: 1,
      icon: '💸',
      title: '$5 Bank Transfer',
      description: 'The $5 equivalent will be transferred to your bank account.',
      points: 5000,
      status: points >= 5000 ? 'unlocked' : 'locked',
    },
    {
      id: 2,
      icon: '💸',
      title: '$5 PayPal International',
      description: 'Receive a $5 PayPal balance transfer directly to your PayPal account email.',
      points: 5000,
      status: points >= 5000 ? 'unlocked' : 'locked',
    },
    {
      id: 3,
      icon: '🎁',
      title: '$5 Virtual Visa Card',
      description: 'Use your $5 prepaid card to shop anywhere Visa is accepted online.',
      points: 5000,
      status: points >= 5000 ? 'unlocked' : 'locked',
    },
    {
      id: 4,
      icon: '🎁',
      title: '$5 Apple Gift Card',
      description: 'Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.',
      points: 5000,
      status: points >= 5000 ? 'unlocked' : 'locked',
    },
    {
      id: 5,
      icon: '🎁',
      title: '$5 Google Play Card',
      description: 'Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.',
      points: 5000,
      status: points >= 5000 ? 'unlocked' : 'locked',
    },
    {
      id: 6,
      icon: '🎁',
      title: '$5 Amazon Gift Card',
      description: 'Get a $5 digital gift card to spend on your favorite tools or platforms.',
      points: 5000,
      status: points >= 5000 ? 'unlocked' : 'locked',
    },
    {
      id: 7,
      icon: '🎁',
      title: '$10 Amazon Gift Card',
      description: 'Get a $10 digital gift card to spend on your favorite tools or platforms.',
      points: 10000,
      status: points >= 10000 ? 'unlocked' : 'locked',
    },
    {
      id: 8,
      icon: '📚',
      title: 'Free Udemy Course',
      description: 'Coming Soon!',
      points: 0,
      status: 'coming-soon',
    },
  ];

  const filteredRewards = rewards.filter(reward => {
    if (rewardFilter === 'all') return true;
    return reward.status === rewardFilter;
  });

  const rewardCounts = {
    all: rewards.length,
    unlocked: rewards.filter(r => r.status === 'unlocked').length,
    locked: rewards.filter(r => r.status === 'locked').length,
    'coming-soon': rewards.filter(r => r.status === 'coming-soon').length,
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-purple-600 rounded-t-md"></div>
        <h2 className="text-2xl font-bold text-gray-900">Redeem Your Points</h2>
      </div>

      
      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setRewardFilter('all')}
          className={`px-4 py-2 rounded-t-md font-medium text-sm transition-colors ${
            rewardFilter === 'all'
              ? 'bg-purple-100 text-purple-600 border-b-2 border-b-purple-600'
              : 'bg-white text-gray-600 hover:bg-purple-50'
          }`}
        >
          All Rewards <span className={`ml-1 text-xs px-2 py-0.5 rounded-t-md ${
            rewardFilter === 'all' ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-700'
          }`}>{rewardCounts.all}</span>
        </button>
        <button
          onClick={() => setRewardFilter('unlocked')}
          className={`px-4 py-2 rounded-t-md font-medium text-sm transition-colors ${
            rewardFilter === 'unlocked'
              ? 'bg-purple-100 text-purple-600 border-b-2 border-b-purple-600'
              : 'bg-white text-gray-600 hover:bg-purple-50 '
          }`}
        >
          Unlocked <span className={`ml-1 text-xs px-2 py-0.5 rounded-t-md ${
            rewardFilter === 'unlocked' ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-700'
          }`}>{rewardCounts.unlocked}</span>
        </button>
        <button
          onClick={() => setRewardFilter('locked')}
          className={`px-4 py-2 rounded-t-md font-medium text-sm transition-colors ${
            rewardFilter === 'locked'
              ? 'bg-purple-100 text-purple-600 border-b-2 border-b-purple-600'
              : 'bg-white text-gray-600 hover:bg-purple-50'
          }`}
        >
          Locked <span className={`ml-1 text-xs px-2 py-0.5 rounded-t-md ${
            rewardFilter === 'locked' ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-700'
          }`}>{rewardCounts.locked}</span>
        </button>
        <button
          onClick={() => setRewardFilter('coming-soon')}
          className={`px-4 py-2 rounded-t-md font-medium text-sm transition-colors ${
            rewardFilter === 'coming-soon'
              ? 'bg-purple-100 text-purple-600 border-b-2 border-b-purple-600'
              : 'bg-white text-gray-600 hover:bg-purple-50'
          }`}
        >
          Coming Soon <span className={`ml-1 text-xs px-2 py-0.5 rounded-t-md ${
            rewardFilter === 'coming-soon' ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-700'
          }`}>{rewardCounts['coming-soon']}</span>
        </button>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <RewardCard
            key={reward.id}
            icon={reward.icon}
            title={reward.title}
            description={reward.description}
            points={reward.points}
            status={reward.status}
            onRedeem={() => console.log(`Redeeming ${reward.title}`)}
          />
        ))}
      </div>
    </div>
  );
};
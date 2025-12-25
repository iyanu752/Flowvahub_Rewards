// pages/RewardsPage.tsx
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { PointsBalanceCard } from '@/components/cards/pointsBalanceCards';
import { DailyStreakCard } from '@/components/cards/dailyStreakCard';
import { FeaturedToolCard } from '@/components/cards/featureToolCard';
import { ReferralCard } from '@/components/cards/referalCard';
import { ShareStackCard } from '@/components/cards/shareStackCard';
import { ReferralLinkCard } from '@/components/cards/referalLinkCard';
import { RedeemRewardsSection } from './redeemRewardsSection';
import { NotificationsPanel } from '@/components/notifications/notificationsPanel';
import { StreakSuccessModal } from '@/components/cards/streakSucessCard';
import { ReclaimVerificationModal } from '@/components/cards/claimVerificationModal';
import { useNotifications } from '@/hooks/useNotification';
import { useRewards } from '@/hooks/useRewards';
import { useAuth } from '@/hooks/useAuth';
import { useReclaimVerification } from '@/hooks/useReclaimVerification';
import { toast } from 'react-toastify';

export const RewardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'earn' | 'redeem'>('earn');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [hasClaimedReclaim, setHasClaimedReclaim] = useState(false);
  const { user } = useAuth();

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAll,
  } = useNotifications(user?.id);

  const {
    points,
    currentStreak,
    hasClaimed,
    weekDays,
    loading,
    claimDailyStreak,
    addPoints,
  } = useRewards(user?.id);

  const {
    submitVerification,
    checkIfAlreadyClaimed,
  } = useReclaimVerification(user?.id);

  useEffect(() => {
    const checkClaimed = async () => {
      const claimed = await checkIfAlreadyClaimed();
      setHasClaimedReclaim(claimed);
    };
    
    if (user?.id) {
      checkClaimed();
    }
  }, [user?.id, checkIfAlreadyClaimed]);

  const handleClaimStreak = async (): Promise<boolean> => {
    try {
      await claimDailyStreak();
      setShowSuccessModal(true);
      return true;
    } catch (error) {
      console.error('Failed to claim daily streak:', error);
      return false;
    }
  };

  const handleShare = () => {
    console.log('Sharing stack...');
    addPoints(25, 'sharing your stack');
  };

  const handleSignup = () => {
    window.open('https://reclaim.ai', '_blank');
  };

  const handleClaimPointsClick = () => {
    setShowVerificationModal(true);
  };

  const handleVerificationSubmit = async (email: string, screenshotUrl: string) => {
    const result = await submitVerification(email, screenshotUrl, 50);
    
    if (result.success) {
      setShowVerificationModal(false);
      setHasClaimedReclaim(true);
      setShowSuccessModal(true);
      
      toast.success(' Verification submitted! Your 50 points have been added.');
    } else {
      toast.error(`❌ ${result.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your rewards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="py-8 px-3">
        <div className="">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards Hub</h1>
              <p className="text-gray-600">
                Earn points, unlock rewards, and celebrate your progress!
              </p>
            </div>
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-300 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-700 hover:text-purple-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-8 border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('earn')}
              className={`pb-4 px-1 border-b-2 cursor-pointer font-medium transition-colors ${
                activeTab === 'earn'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Earn Points
            </button>
            <button
              onClick={() => setActiveTab('redeem')}
              className={`pb-4 px-1 border-b-2 cursor-pointer font-medium transition-colors ${
                activeTab === 'redeem'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Redeem Rewards
            </button>
          </div>

          {activeTab === 'earn' ? (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-purple-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Rewards Journey</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                    <PointsBalanceCard 
                      points={points} 
                      goalAmount={5} 
                      totalNeeded={5000} 
                    />
                  </div>
                  <div className="transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                    <DailyStreakCard
                      currentStreak={currentStreak}
                      weekDays={weekDays}
                      hasClaimed={hasClaimed}
                      onClaim={handleClaimStreak}
                    />
                  </div>
                  <div className="transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                    <FeaturedToolCard
                      title="Top Tool Spotlight"
                      subtitle="Reclaim"
                      description="Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!"
                      pointsReward={50}
                      onSignup={handleSignup}
                      onClaimPoints={handleClaimPointsClick}
                      isClaimDisabled={hasClaimedReclaim}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-purple-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Earn More Points</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <ReferralCard
                      title="Refer and win 10,000 points!"
                      description="Invite 3 friends"
                      deadline="Nov 20"
                    />
                  </div>
                  <div>
                    <ShareStackCard points={25} onShare={handleShare} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-purple-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Refer & Earn</h2>
                </div>

                <ReferralLinkCard
                  referralCount={0}
                  pointsEarned={0}
                  referralLink="https://app.flowvahub.com/signup?ref=iyanu9744"
                />
              </div>
            </div>
          ) : (
            <RedeemRewardsSection points={points} />
          )}
        </div>
      </div>

   
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        userId={user?.id}
        notifications={notifications}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        deleteNotification={deleteNotification}
        deleteAll={deleteAll}
      />

  
      <ReclaimVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onVerified={handleVerificationSubmit}
        pointsReward={25}
      />


      <StreakSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};
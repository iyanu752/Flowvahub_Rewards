import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-toastify';

// interface UserPoints {
//   id: string;
//   user_id: string;
//   total_points: number;
//   created_at: string;
//   updated_at: string;
// }

// interface DailyStreak {
//   id: string;
//   user_id: string;
//   current_streak: number;
//   longest_streak: number;
//   last_claim_date: string | null;
//   created_at: string;
//   updated_at: string;
// }

// interface StreakHistory {
//   claim_date: string;
//   points_earned: number;
// }

export const useRewards = (userId: string | undefined) => {
  const [points, setPoints] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [weekDays, setWeekDays] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const [loading, setLoading] = useState(true);


  const fetchRewardsData = async () => {
    if (!userId) return;

    try {

      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (pointsError) throw pointsError;


      const { data: streakData, error: streakError } = await supabase
        .from('daily_streaks')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (streakError) throw streakError;


      if (!pointsData) {
        await supabase.from('user_points').insert({
          user_id: userId,
          total_points: 0
        });
        setPoints(0);
      } else {
        setPoints(pointsData.total_points);
      }

      if (!streakData) {
        await supabase.from('daily_streaks').insert({
          user_id: userId,
          current_streak: 0,
          longest_streak: 0
        });
        setCurrentStreak(0);
        setLongestStreak(0);
      } else {
        setCurrentStreak(streakData.current_streak);
        setLongestStreak(streakData.longest_streak);


        const today = new Date().toISOString().split('T')[0];
        const lastClaim = streakData.last_claim_date;
        setHasClaimed(lastClaim === today);
      }


      await fetchWeekHistory();

    } catch (error) {
      console.error('Error fetching rewards data:', error);
    } finally {
      setLoading(false);
    }
  };


  const fetchWeekHistory = async () => {
    if (!userId) return;

    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);

    const { data, error } = await supabase
      .from('streak_history')
      .select('claim_date')
      .eq('user_id', userId)
      .gte('claim_date', weekAgo.toISOString().split('T')[0])
      .lte('claim_date', today.toISOString().split('T')[0]);

    if (!error && data) {
      const claimedDates = data.map(d => d.claim_date);
      const weekStatus = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - (6 - i));
        const dateStr = date.toISOString().split('T')[0];
        return claimedDates.includes(dateStr);
      });
      setWeekDays(weekStatus);
    }
  };


  const claimDailyStreak = async () => {
    if (!userId || hasClaimed) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];


      const { data: streakData } = await supabase
        .from('daily_streaks')
        .select('*')
        .eq('user_id', userId)
        .single();

      let newStreak = 1;
      if (streakData?.last_claim_date === yesterdayStr) {

        newStreak = (streakData.current_streak || 0) + 1;
      }

      const newLongestStreak = Math.max(newStreak, streakData?.longest_streak || 0);


      await supabase
        .from('daily_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: newLongestStreak,
          last_claim_date: today
        })
        .eq('user_id', userId);

      await supabase.from('streak_history').insert({
        user_id: userId,
        claim_date: today,
        points_earned: 5
      });


      const { data: pointsData } = await supabase
        .from('user_points')
        .select('total_points')
        .eq('user_id', userId)
        .single();

      const newPoints = (pointsData?.total_points || 0) + 5;

      await supabase
        .from('user_points')
        .update({ total_points: newPoints })
        .eq('user_id', userId);


      setPoints(newPoints);
      setCurrentStreak(newStreak);
      setLongestStreak(newLongestStreak);
      setHasClaimed(true);

      await fetchWeekHistory();

      toast.success('Streak claimed! +5 points earned');
    } catch (error) {
      console.error('Error claiming streak:', error);
      toast.error('Failed to claim streak');
    }
  };


  const addPoints = async (amount: number, reason?: string) => {
    if (!userId) return;

    try {
      const { data: pointsData } = await supabase
        .from('user_points')
        .select('total_points')
        .eq('user_id', userId)
        .single();

      const newPoints = (pointsData?.total_points || 0) + amount;

      await supabase
        .from('user_points')
        .update({ total_points: newPoints })
        .eq('user_id', userId);

      setPoints(newPoints);
      toast.success(`+${amount} points earned${reason ? ` for ${reason}` : ''}!`);
    } catch (error) {
      console.error('Error adding points:', error);
      toast.error('Failed to add points');
    }
  };

  useEffect(() => {
    fetchRewardsData();
  }, [userId]);

  return {
    points,
    currentStreak,
    longestStreak,
    hasClaimed,
    weekDays,
    loading,
    claimDailyStreak,
    addPoints,
    refresh: fetchRewardsData
  };
};
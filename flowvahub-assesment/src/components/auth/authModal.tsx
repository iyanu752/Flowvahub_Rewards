import React, { useState, useEffect } from 'react';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';

type AuthMode = 'login' | 'signup';

export const AuthModal: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const createWelcomeNotification = async (userId: string, userName: string) => {
    await supabase.from('notifications').insert({
      user_id: userId,
      title: `Welcome, ${userName}!`,
      message: "We're thrilled to have you on board! Explore powerful tools, build your personal stack, and start unlocking rewards through daily streaks, referrals, and more. Your journey to smarter productivity starts here.",
      type: 'welcome'
    });
  };

  const createStreakNotification = async (userId: string) => {
    await supabase.from('notifications').insert({
      user_id: userId,
      title: 'Daily Streak Reminder',
      message: "Don't forget to claim your streak today and start building consistency! Keep going strong — staying consistent for the next 30 days could put you in the running to win 5,000 Flowva Points 🎉",
      type: 'streak'
    });
  };

  useEffect(() => {
    if (!loading && user) {
      const initializeUser = async () => {

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';

        if (!profile) {

          await supabase.from('profiles').upsert({
            id: user.id,
            email: user.email
          });

          await createWelcomeNotification(user.id, userName);
          await createStreakNotification(user.id);
        } else {
       
          await createStreakNotification(user.id);
        }

        navigate('/dashboard/rewards');
      };

      initializeUser();
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#9013fe] via-[#8B5CF6] to-[#6D28D9] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {mode === 'signup' ? (
          <SignupForm
            onSwitchToLogin={() => setMode('login')}
            onSuccess={() => {
              toast.success('Signup successful!');
            }}
          />
        ) : (
          <LoginForm
            onSwitchToSignup={() => setMode('signup')}
            onSuccess={() => {
              toast.success('Login successful!');
            }}
          />
        )}
      </div>
    </div>
  );
};
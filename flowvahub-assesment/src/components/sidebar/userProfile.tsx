import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { MessageSquare, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  collapsed?: boolean;
}

export default function UserProfile({ collapsed = false }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getUsername = (email: string | undefined): string => {
    if (!email) return 'User';
    return email.split('@')[0];
  };

  const getAvatar = (email: string | undefined): string => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleFeedback = () => {
    // Placeholder - not functional yet
    console.log('Feedback clicked');
    setMenuOpen(false);
  };

  const handleSupport = () => {
    // Placeholder - not functional yet
    console.log('Support clicked');
    setMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          {!collapsed && (
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!user?.email) {
    return null;
  }

  return (
    <div className="border-t  border-gray-200 p-4 relative" ref={menuRef}>
      {/* Dropdown Menu */}
      {menuOpen && !collapsed && (
        <div className="absolute  bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border  border-purple-500 py-2 z-50">
          {/* Feedback - Disabled */}
          <button
            onClick={handleFeedback}
            disabled
            className="w-full flex  items-center gap-3 px-4 py-2.5 text-left text-gray-400 cursor-not-allowed"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Feedback</span>
          </button>

          {/* Support - Disabled */}
          <button
            onClick={handleSupport}
            disabled
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-gray-400 cursor-not-allowed"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Support</span>
          </button>

          {/* Divider */}
          <div className="border-t border-gray-200 my-1" />

          {/* Log Out - Functional */}
        <button
        onClick={handleLogout}
        className="
            w-full flex items-center gap-3 px-4 py-2.5
            border rounded-lg
            text-left text-red-600
            transition-colors
            hover:bg-red-50 hover:text-red-700
            focus:outline-none
        "
        >
        <LogOut className="w-4 h-4 text-red-600" />
        <span className="text-sm font-medium">Log Out</span>
        </button>

        </div>
      )}

      {/* User Profile Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-full flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center font-semibold text-lg">
          {getAvatar(user.email)}
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {getUsername(user.email)}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
            </div>
            {/* <ChevronUp 
              className={`w-4 h-4 text-gray-400 transition-transform ${
                menuOpen ? 'rotate-180' : ''
              }`} 
            /> */}
          </>
        )}
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { GoogleAuthButton } from './GoogleAuthButton';
import { getErrorMessage } from '@/helpers/errorMessageHelper';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToSignup,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log('Logged in:', data.user);
      onSuccess?.();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to log in'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
     
      <div className="text-center">
        <h1 className="text-2xl text-[#6D28D9] font-bold mb-2">
          Log in to flowva
        </h1>
        <p className="text-gray-600">Log in to receive personalized recommendations</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="h-12 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
   
        </div>


        <div className="text-right">
          <button
            type="button"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          onClick={handleLogin}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-base font-medium"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </div>


      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">or</span>
        </div>
      </div>


      <GoogleAuthButton
        loading={loading}
        onError={setError}
        onLoadingChange={setLoading}
      />

  
      <div className="text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <button
          onClick={onSwitchToSignup}
          className=" cursor-pointer hover:underline text-purple-600 hover:text-purple-700 font-semibold"
          disabled={loading}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

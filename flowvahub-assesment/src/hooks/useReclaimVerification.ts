import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getErrorMessage } from '@/helpers/errorMessageHelper';

export const useReclaimVerification = (userId: string | undefined) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const checkIfAlreadyClaimed = async (): Promise<boolean> => {
    if (!userId) return false;

    try {
      const { data, error } = await supabase
        .from('reclaim_verifications')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking verification:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking verification:', error);
      return false;
    }
  };

  const submitVerification = async (
    email: string,
    screenshotBase64: string,
    pointsReward: number
  ): Promise<{ success: boolean; message: string }> => {
    if (!userId) {
      return { success: false, message: 'User not authenticated' };
    }

    setIsVerifying(true);

    try {
      const alreadyClaimed = await checkIfAlreadyClaimed();

      if (alreadyClaimed) {
        setIsVerifying(false);
        return {
          success: false,
          message: 'You have already claimed this reward',
        };
      }

      const fileName = `${userId}-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from('verification-screenshots')
        .upload(fileName, dataURLtoBlob(screenshotBase64), {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('verification-screenshots')
        .getPublicUrl(fileName);


      const { error: insertError } = await supabase
        .from('reclaim_verifications')
        .insert({
          user_id: userId,
          reclaim_email: email,
          screenshot_url: urlData.publicUrl,
          points_rewarded: pointsReward,
          status: 'pending',
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        throw insertError;
      }

      const { error: pointsError } = await supabase.rpc('add_user_points', {
        p_user_id: userId,
        p_points: pointsReward,
        p_description: 'Verified Reclaim signup',
      });

      if (pointsError) {
        throw pointsError;
      }

      setIsVerifying(false);

      return {
        success: true,
        message: 'Verification submitted successfully!',
      };
    } catch (error) {
      console.error('Error submitting verification:', error);

      setIsVerifying(false);

      return {
        success: false,
        message: getErrorMessage(error, 'Failed to submit verification'),
      };
    }
  };

  return {
    isVerifying,
    submitVerification,
    checkIfAlreadyClaimed,
  };
};

function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;

  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

import React, { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { getErrorMessage } from '@/helpers/errorMessageHelper';

interface ReclaimVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: (email: string, screenshotUrl: string) => void;
  pointsReward: number;
}

export const ReclaimVerificationModal: React.FC<ReclaimVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerified,
  pointsReward,
}) => {
  const [email, setEmail] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      setScreenshot(file);
      setError('');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setError('');

    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!screenshot) {
      setError('Please upload a screenshot');
      return;
    }

    setIsSubmitting(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        await onVerified(email, base64String);
        
        setEmail('');
        setScreenshot(null);
        setScreenshotPreview('');
        setIsSubmitting(false);
      };
      reader.readAsDataURL(screenshot);
    } catch (err) {
      setError( getErrorMessage(err, 'Failed to submit. Please try again.'));
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setEmail('');
      setScreenshot(null);
      setScreenshotPreview('');
      setError('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl">
        <div className="bg-white p-6 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Claim Your {pointsReward} Points
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>


        <div className="p-6 space-y-5">
     
          <div className="space-y-3">
            <p className="text-gray-700 text-sm">
              Sign up for Reclaim (free, no payment needed), then fill the form below:
            </p>
            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <span className="shrink-0 w-5 h-5 bg-blue-500 text-white rounded flex items-center justify-center text-xs font-bold mt-0.5">
                  1
                </span>
                <p className="text-sm text-gray-700">Enter your Reclaim sign-up email.</p>
              </div>
              <div className="flex gap-2 items-start">
                <span className="shrink-0 w-5 h-5 bg-blue-500 text-white rounded flex items-center justify-center text-xs font-bold mt-0.5">
                  2
                </span>
                <p className="text-sm text-gray-700">
                  Upload a screenshot of your Reclaim profile showing your email.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              After verification, you'll get {pointsReward} Flowva Points! 🎉 😊
            </p>
          </div>

    
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

       
          <div>
            <label htmlFor="reclaim-email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email used on Reclaim
            </label>
            <input
              id="reclaim-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Upload screenshot (mandatory)
            </label>
            
            <div className="relative">
              <input
                id="screenshot-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isSubmitting}
              />
              
              {!screenshotPreview ? (
                <label
                  htmlFor="screenshot-upload"
                  className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 justify-center"
                >
                  <Upload className="w-5 h-5 text-gray-500" />
                  <span>Choose file</span>
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={screenshotPreview}
                    alt="Screenshot preview"
                    className="w-full h-40 object-cover rounded-md border border-gray-200"
                  />
                  <button
                    onClick={() => {
                      setScreenshot(null);
                      setScreenshotPreview('');
                    }}
                    disabled={isSubmitting}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

 
          <div className="flex gap-3 pt-2 justify-end">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !email || !screenshot}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Claim'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Users, Copy, Check, Facebook, Twitter, Linkedin, MessageCircle} from 'lucide-react';

interface ReferralLinkCardProps {
  referralCount: number;
  pointsEarned: number;
  referralLink: string;
}

export const ReferralLinkCard: React.FC<ReferralLinkCardProps> = ({
  referralCount,
  pointsEarned,
  referralLink,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialPlatforms = [
    { name: 'Facebook', icon: <Facebook/>, color: 'bg-blue-600', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}` },
    { name: 'X', icon: <Twitter/>, color: 'bg-black', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}` },
    { name: 'LinkedIn', icon: <Linkedin/>, color: 'bg-blue-700', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}` },
    { name: 'WhatsApp', icon: <MessageCircle/>, color: 'bg-green-500', url: `https://wa.me/?text=${encodeURIComponent(referralLink)}` },
  ];

  return (
    <div className="  ">
      <div className="flex items-center gap-3 mb-6 bg-linear-to-br from-blue-50 to-blue-50 border border-blue-100  rounded-2xl p-6">
        <div className="w-10 h-10   flex items-center justify-center">
          <Users className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Share Your Link</h3>
          <p className="text-sm text-gray-600">
            Invite friends and earn 25 points when they join!
          </p>
        </div>
      </div>

    
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">{referralCount}</div>
          <div className="text-sm text-gray-600">Referrals</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">{pointsEarned}</div>
          <div className="text-sm text-gray-600">Points Earned</div>
        </div>
      </div>

     
    <div className="mb-6 bg-linear-to-br from-purple-50 to-blue-50 border border-purple-100  rounded-2xl p-6">
    <label className="text-sm font-medium text-gray-700 mb-2 block">
        Your personal referral link:
    </label>

    <div className="relative">
        <input
        type="text"
        value={referralLink}
        readOnly
        className="
            w-full px-4 pr-14 py-3
            bg-white border border-gray-300 rounded-lg
            text-sm text-gray-700
            focus:outline-none focus:ring-2 focus:ring-purple-500
        "
        />

        <button
        onClick={handleCopy}
        className="
            absolute right-2 top-1/2 -translate-y-1/2
            p-2 rounded-md cursor-pointer
            text-purple-600
             transition-colors
        "
        title="Copy link"
        >
        {copied ? <Check className="" /> : <Copy className="" />}
        </button>
    </div>
    </div>


      
        <div className="flex justify-center gap-3">
        {socialPlatforms.map((platform) => (
            <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${platform.name}`}
            className={`
                w-12 h-12 rounded-full
                flex items-center justify-center
                text-white
                ${platform.color}
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:scale-105
                hover:shadow-lg
                hover:opacity-100
                will-change-transform
            `}
            >
            <span className="text-md">{platform.icon}</span>
            </a>
        ))}
        </div>

    </div>
  );
};
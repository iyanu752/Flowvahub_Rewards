import {
  Home,
  Compass,
  PackageOpen,
  Layers,
  CreditCard,
  Gift,
  Settings,
} from 'lucide-react';

export const SIDEBAR_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, path: '/dashboard/home' },
  { id: 'discover', label: 'Discover', icon: Compass, path: '/dashboard/discover' },
  { id: 'library', label: 'Library', icon: PackageOpen, path: '/dashboard/library' },
  { id: 'stack', label: 'Tech Stack', icon: Layers, path: '/dashboard/tech-stack' },
  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard, path: '/dashboard/subscriptions' },
  { id: 'rewards', label: 'Rewards Hub', icon: Gift, path: '/dashboard/rewards' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

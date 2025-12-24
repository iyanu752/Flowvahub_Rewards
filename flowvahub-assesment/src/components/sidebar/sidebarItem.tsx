import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, type LucideIcon } from 'lucide-react';


interface SidebarItemData {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarItemProps {
  item: SidebarItemData;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const Icon = item.icon;
  const navigate = useNavigate();
  const location = useLocation();
  const isAccessible = item.id === 'rewards';
  const isActive = location.pathname === item.path;

  const handleClick = () => {
    if (isAccessible) {
      navigate(item.path);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isAccessible}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative
        ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'}
        ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-700'}
        ${isAccessible ? 'hover:bg-gray-50' : 'opacity-50'}
      `}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm font-medium">{item.label}</span>
      {!isAccessible && (
        <Lock className="w-4 h-4 ml-auto text-gray-400" />
      )}
    </button>
  );
};

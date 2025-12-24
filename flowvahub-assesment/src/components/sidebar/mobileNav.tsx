import { Menu } from 'lucide-react';

export const TopNav = ({ onMenuClick }) => {
  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center px-4 md:hidden">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <Menu className="w-6 h-6" />
      </button>

      <span className="ml-3 font-semibold text-purple-600">Flowva</span>
    </header>
  );
};

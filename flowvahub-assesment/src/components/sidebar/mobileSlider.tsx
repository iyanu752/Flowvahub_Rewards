import { X } from 'lucide-react';
import { Sidebar } from './sidebar';

export const MobileSidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">

      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

  
      <div className="relative w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 z-10"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <Sidebar onNavigate={onClose} />
      </div>
    </div>
  );
};
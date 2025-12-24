import { SIDEBAR_ITEMS } from './sidebar.config';
import { SidebarItem } from './sidebarItem';
import UserProfile from './userProfile';

export const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  return (
    <aside className="h-full bg-white border-r border-gray-200 w-64 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <span className="text-xl font-semibold text-purple-600">Flowva</span>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {SIDEBAR_ITEMS.map((item) => (
            <li key={item.id} onClick={onNavigate}>
              <SidebarItem item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <UserProfile />
    </aside>
  );
};
import React, { useState } from 'react';
import { LayoutDashboard, Briefcase, FileInput as Input, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
    { id: 'inputs', icon: Input, label: 'Inputs' },
    { id: 'profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <div className={`bg-[#E84C3D] text-white h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <span className="text-xl font-bold">LOGO</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-[#EC6D61] hover:bg-[#F27B70]"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center p-4 hover:bg-[#EC6D61] transition-colors ${
              activeTab === item.id ? 'bg-[#EC6D61]' : ''
            }`}
          >
            <item.icon size={24} />
            {!collapsed && <span className="ml-4">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar
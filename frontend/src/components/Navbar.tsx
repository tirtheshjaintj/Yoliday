import React, { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

interface NavbarProps {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSearch }) => {
  const [activeTab, setActiveTab] = useState('project');

  const tabs = [
    { id: 'project', label: 'Project' },
    { id: 'saved', label: 'Saved' },
    { id: 'shared', label: 'Shared' },
    { id: 'achievement', label: 'Achievement' },
  ];

  return (
    <div className=" bg-white shadow-sm">
      {/* Top Header */}
      <div className="hidden md:block border-b border-gray-200">
        <div className="flex items-center justify-end px-6 py-2 space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium text-gray-800">{user.name}</span>
            <ChevronDown size={16} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div>
        <h1 className="font-roboto pt-4 pl-2 sm:pl-8 font-semibold text-[22px] leading-[100%] tracking-[-0.01em] text-[#303030]">
          Portfolio
        </h1>
        <i className="fas fa-bell text-[#DF5532] text-[22px]"></i>
      </div>
      {/* <div className="w-[87px] h-[26px] absolute top-[22px] left-[22px] flex items-center space-x-2 font-roboto font-semibold text-[22px] leading-[100%] tracking-[0%] text-[#303030]">
        <span>Portfolio</span>
        <i className="fas fa-bell text-[#DF5532] text-[22px]"></i>
      </div> */}

      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2 md:space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-[#E84C3D] border-b-2 border-[#E84C3D]'
                  : 'text-gray-600 hover:text-[#E84C3D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className={`relative ${window.innerWidth < 768 ? 'w-full pt-1' : ''}`}
        >
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search a project"
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E84C3D] focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

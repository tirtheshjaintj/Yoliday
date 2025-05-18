import React from 'react';
import { Home, Briefcase, FileInput, UserCircle } from 'lucide-react';

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        <button className="flex flex-col items-center p-2">
          <Home size={24} className="text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <Briefcase size={24} className="text-[#E84C3D]" />
          <span className="text-xs text-[#E84C3D] mt-1">Portfolio</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <FileInput size={24} className="text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Input</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <UserCircle size={24} className="text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Profile</span>
        </button>
      </div>
    </nav>
  );
}

export default MobileNav;
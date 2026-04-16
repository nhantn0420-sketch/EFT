import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: '🏠 Trang chủ' },
  { id: 'overview', label: '📖 EFT là gì?' },
  { id: 'how-it-works', label: '⚙️ Cơ chế hoạt động' },
  { id: 'benefits', label: '✅ Lợi ích' },
  { id: 'security', label: '🔐 Bảo mật' },
  { id: 'legal', label: '⚖️ Pháp lý & Quyền riêng tư' },
  { id: 'recommendations', label: '💡 Khuyến nghị' },
  { id: 'simulator', label: '🚀 EFT Simulator' },
  { id: 'conclusion', label: '🏁 Kết luận' },
];

export default function Sidebar({ activeSection }) {
  const [open, setOpen] = useState(true);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-slate-700 text-white p-2 rounded-lg"
      >
        {open ? '✕' : '☰'}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          w-64 bg-slate-900 border-r border-slate-700 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">E</div>
            <div>
              <div className="text-white font-semibold text-sm">EFT Demo</div>
              <div className="text-slate-400 text-xs">Electronic Funds Transfer</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left px-5 py-2.5 text-sm transition-colors duration-150 
                ${activeSection === item.id
                  ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 text-xs text-slate-500 text-center">
          Hệ Thống Thông Tin Quản Lý
        </div>
      </aside>
    </>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { type User } from '@/lib/api';
import {
  IconDashboard, IconFolder, IconShare, IconTrash,
  IconSettings, IconLogout,
} from './icons';

interface Props {
  children: ReactNode;
  user: User | null;
  onLogout: () => void;
}

const NAV = [
  { href: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
  { href: '/files',     label: 'My Files',  Icon: IconFolder },
  { href: '/shared',    label: 'Shared',    Icon: IconShare },
  { href: '/trash',     label: 'Trash',     Icon: IconTrash },
  { href: '/settings',  label: 'Settings',  Icon: IconSettings },
];

function formatBytes(bytes: number) {
  const gb = bytes / 1_073_741_824;
  return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(bytes / 1_048_576).toFixed(0)} MB`;
}

export default function DashboardLayout({ children, user, onLogout }: Props) {
  const pathname = usePathname();
  const quotaUsed  = Number(user?.quota_used  ?? 0);
  const quotaTotal = Number(user?.quota_total ?? 32212254720);
  const pct = Math.min(100, Math.round((quotaUsed / quotaTotal) * 100));

  return (
    <div className="flex min-h-screen bg-brand-bg dark:bg-slate-900">

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-64 shrink-0
                        bg-white dark:bg-slate-800
                        border-r border-slate-light dark:border-slate-700">

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-light dark:border-slate-700">
          <Image src="/supfile.png" alt="SUPFile" width={32} height={32} className="rounded-lg" priority />
          <span className="font-bold text-slate-dark dark:text-slate-100 text-lg tracking-tight">SUPFile</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand'
                    : 'text-slate-mid dark:text-slate-400 hover:bg-brand-bg dark:hover:bg-slate-700 hover:text-slate-dark dark:hover:text-slate-100 hover:translate-x-0.5'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand rounded-r-full" />
                )}
                <span className={`transition-colors duration-200 ${active ? 'text-brand' : 'text-slate-mid dark:text-slate-500'}`}>
                  <Icon />
                </span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Quota bar */}
        <div className="px-5 py-4 border-t border-slate-light dark:border-slate-700 space-y-2">
          <div className="flex justify-between text-xs text-slate-mid dark:text-slate-400">
            <span>Storage</span>
            <span>{formatBytes(quotaUsed)} / {formatBytes(quotaTotal)}</span>
          </div>
          <div className="h-1.5 bg-brand-bg dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-slate-mid dark:text-slate-400">{pct}% used</p>
        </div>

        {/* User + logout */}
        <div className="px-4 py-4 border-t border-slate-light dark:border-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-semibold text-sm">
            {user?.display_name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-dark dark:text-slate-100 truncate">
              {user?.display_name || 'User'}
            </p>
            <p className="text-xs text-slate-mid dark:text-slate-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={onLogout}
            aria-label="Logout"
            className="text-slate-mid dark:text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <IconLogout />
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-light dark:border-slate-700 px-6 py-4 flex items-center gap-4">
          <div className="md:hidden flex items-center gap-2 mr-2">
            <Image src="/supfile.png" alt="SUPFile" width={28} height={28} className="rounded-lg" />
            <span className="font-bold text-slate-dark dark:text-slate-100">SUPFile</span>
          </div>

          <div className="flex-1 flex items-center">
            <form action="/files" method="get" className="relative w-full max-w-xs hidden sm:block">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-mid dark:text-slate-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                name="search"
                type="search"
                placeholder="Search files…"
                className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-brand-bg dark:bg-slate-700
                           border border-slate-light dark:border-slate-600
                           text-slate-dark dark:text-slate-100 placeholder-slate-mid dark:placeholder-slate-400
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand
                           transition-all duration-200"
              />
            </form>
          </div>

          <div className="text-sm text-slate-mid dark:text-slate-400 hidden sm:block">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 page-enter">{children}</main>
      </div>
    </div>
  );
}

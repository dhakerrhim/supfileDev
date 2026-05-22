import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #ddeefb 0%, #f5faff 45%, #eef2ff 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="fixed top-0 left-0 w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2da2fd 0%, transparent 65%)', transform: 'translate(-35%, -35%)' }}
      />
      <div
        aria-hidden
        className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3cb5ff 0%, transparent 65%)', transform: 'translate(30%, 30%)' }}
      />
      <div
        aria-hidden
        className="fixed bottom-0 left-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a5d3fe 0%, transparent 70%)', transform: 'translate(-50%, 45%)' }}
      />

      <div className="relative z-10 w-full max-w-md page-enter">
        {children}

        {/* Footer note */}
        <p className="text-center text-xs text-slate-mid mt-6">
          SUPFile &copy; {new Date().getFullYear()} — Secure cloud storage
        </p>
      </div>
    </div>
  );
}

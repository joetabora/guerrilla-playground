'use client';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 bg-black border-t-2 border-neon-cyan/30">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-white/60 text-sm mb-4">
          © {new Date().getFullYear()} Guerrilla Social Club
        </div>
        <div className="text-white/40 text-xs">
          Gaming. Harleys. Filth. One crew.
        </div>
      </div>
    </footer>
  );
}

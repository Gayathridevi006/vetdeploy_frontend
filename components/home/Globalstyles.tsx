// components/home/GlobalStyles.tsx
// Inject once in the root layout or at the top of the home page.

export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

      .font-display { font-family: 'Playfair Display', Georgia, serif; }
      .font-body    { font-family: 'DM Sans', system-ui, sans-serif; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-12px); }
      }
      @keyframes pulse-ring {
        0%   { transform: scale(0.95); box-shadow: 0 0 0 0   rgba(200,169,110,0.4); }
        70%  { transform: scale(1);    box-shadow: 0 0 0 18px rgba(200,169,110,0);   }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0   rgba(200,169,110,0);   }
      }

      .animate-fade-up-1 { animation: fadeUp 0.8s ease forwards; animation-delay: 0.1s; opacity: 0; }
      .animate-fade-up-2 { animation: fadeUp 0.8s ease forwards; animation-delay: 0.3s; opacity: 0; }
      .animate-fade-up-3 { animation: fadeUp 0.8s ease forwards; animation-delay: 0.5s; opacity: 0; }
      .animate-fade-up-4 { animation: fadeUp 0.8s ease forwards; animation-delay: 0.7s; opacity: 0; }
      .animate-fade-in   { animation: fadeIn 1.2s ease forwards; animation-delay: 0.2s; opacity: 0; }

      .shimmer-text {
        background: linear-gradient(90deg, #c8a96e 0%, #f5d89a 40%, #c8a96e 60%, #e8c98e 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }

      .float-icon { animation: float 4s ease-in-out infinite; }
      .pulse-btn  { animation: pulse-ring 2.5s ease-in-out infinite; }

      .card-hover {
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      }
      .card-hover:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        border-color: rgba(200,169,110,0.3);
      }

      .nav-link { position: relative; transition: color 0.2s; }
      .nav-link::after {
        content: '';
        position: absolute; bottom: -3px; left: 0;
        width: 0; height: 1px;
        background: #c8a96e;
        transition: width 0.3s ease;
      }
      .nav-link:hover::after { width: 100%; }
      .nav-link:hover { color: #c8a96e; }

      .mesh-bg {
        background:
          radial-gradient(ellipse 80% 60% at 20% 20%, rgba(200,169,110,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 80%, rgba(30,58,138,0.25)   0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 50% 50%, rgba(15,25,50,0.8)     0%, transparent 100%);
      }
      .diagonal-divider   { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
      .diagonal-divider-2 { clip-path: polygon(0 6%, 100% 0, 100% 100%, 0 100%); }

      .grain::before {
        content: '';
        position: fixed; inset: 0; z-index: 0;
        opacity: 0.025; pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 256px;
      }
    `}</style>
  );
}
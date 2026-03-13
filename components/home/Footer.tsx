const FOOTER_LINKS = ["Privacy", "Terms", "Contact", "Sitemap"];
import Image from "next/image";
export default function Footer() {
  return (
    <footer
      className="border-t py-12 px-6"
      style={{ background: "#04090f", borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">

              <Image
                src="/vetdeploy-logo.png"
                alt="VetDeploy Logo"
                width={32}
                height={32}
              />

              <span className="font-display text-xl font-bold tracking-tight text-[#f0e6d3]">
                Vetdeploy
              </span>
            </div>

            <p className="font-body text-sm text-slate-400">
              Honoring Service, Empowering Veterans.
            </p>
        </div>

          {/* Links */}
          <div className="flex gap-6 text-sm font-body text-slate-500">
            {FOOTER_LINKS.map((l) => (
              <a key={l} href="#" className="hover:text-slate-300 transition-colors">
                {l}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-body text-xs text-slate-600">
            © {new Date().getFullYear()} Vetdeploy. Honoring Service.
          </p>
        </div>
      </div>
    </footer>
  );
}
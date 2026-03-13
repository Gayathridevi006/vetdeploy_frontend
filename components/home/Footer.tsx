const FOOTER_LINKS = ["Privacy", "Terms", "Contact", "Sitemap"];
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t py-12 px-6"
      style={{ background: "#d9e0e8", borderColor: "rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo + Tagline */}
          <div className="flex items-center gap-4">

            <Image
              src="/vetdeploy-logo.png"
              alt="VetDeploy Logo"
              width={32}
              height={32}
            />

            <div>
              <span className="font-display text-xl font-bold tracking-tight text-black">
                Vetdeploy
              </span>

              <p className="font-body text-sm text-gray-700">
                Honoring Service, Empowering Veterans.
              </p>
            </div>

          </div>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm font-body text-gray-700">

            <Link href="/privacy" className="hover:text-black transition-colors">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-black transition-colors">
              Terms
            </Link>

            <Link href="/contact" className="hover:text-black transition-colors">
              Contact
            </Link>

            <Link href="/sitemap" className="hover:text-black transition-colors">
              Sitemap
            </Link>

          </div>

          {/* Copyright */}
          <p className="font-body text-xs text-gray-600">
            © {new Date().getFullYear()} Vetdeploy. Honoring Service.
          </p>

        </div>

      </div>
    </footer>
  );
}c
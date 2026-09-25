import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6ab3bd02612032ac3b63c0eb/1b54dbc73_lidmun_officialmun_workers_dev_logo_1570384c.jpg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const [entered, setEntered] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const appsActive = path.startsWith("/applications") || path === "/registration";
  const resourcesActive = ["/about", "/rules-of-procedure", "/resources", "/faq"].includes(path) || path.startsWith("/committees");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 transition-all duration-500 ${entered ? "header-entered" : "header-pre"}`}>
      <div className="header-accent-line" />
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <img src={LOGO_URL} alt="LIDMUN Logo" className="w-12 h-12 rounded-full object-cover" />
            <div className="flex flex-col leading-none">
              <span className="morse-code hidden sm:block">.-.. .. -.. -- ..- -.</span>
              <span className="text-2xl font-bold tracking-wider">LIDMUN</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/" className={`nav-link px-3 py-2 ${path === "/" ? "nav-link-active" : ""}`}>&gt; HOME</Link>

            {/* Applications Dropdown */}
            <div
              className="dropdown relative"
              onMouseEnter={() => setOpenDropdown("apps")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className={`nav-link px-3 py-2 flex items-center gap-1 cursor-default ${appsActive ? "nav-link-active" : ""}`}>
                &gt; APPLICATIONS <ChevronDown className="w-3 h-3" />
              </span>
              <div className={`dropdown-content ${openDropdown === "apps" ? "opacity-100 visible translate-y-0" : ""}`}>
                <Link to="/applications/chair" className="dropdown-item">&gt; CHAIRS APPLICATION</Link>
                <Link to="/applications/admin" className="dropdown-item">&gt; ADMIN APPLICATIONS</Link>
                <Link to="/registration" className="dropdown-item">&gt; REGISTRATION</Link>
              </div>
            </div>

            {/* Summit Resources Dropdown */}
            <div
              className="dropdown relative"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className={`nav-link px-3 py-2 flex items-center gap-1 cursor-default ${resourcesActive ? "nav-link-active" : ""}`}>
                &gt; SUMMIT RESOURCES <ChevronDown className="w-3 h-3" />
              </span>
              <div className={`dropdown-content align-right ${openDropdown === "resources" ? "opacity-100 visible translate-y-0" : ""}`}>
                <Link to="/about" className="dropdown-item">&gt; SUMMIT OVERVIEW</Link>
                <Link to="/committees" className="dropdown-item">&gt; COMMITTEES</Link>
                <Link to="/rules-of-procedure" className="dropdown-item">&gt; RULES OF PROCEDURE</Link>
                <Link to="/resources" className="dropdown-item">&gt; DELEGATE RESOURCES</Link>
                <Link to="/faq" className="dropdown-item">&gt; FAQ</Link>
              </div>
            </div>

            <Link to="/secretariat" className={`nav-link px-3 py-2 ${path === "/secretariat" ? "nav-link-active" : ""}`}>&gt; TEAM</Link>

            <Link to="/echits/login" className="nav-login-btn ml-2 inline-flex items-center gap-2 border border-white/30 px-4 py-2 font-mono text-xs tracking-wider uppercase text-white hover:bg-white hover:text-black transition-all duration-300">
              <span>LOGIN</span>
              <LogIn className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-6 py-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Link to="/" className="block py-3 nav-link border-b border-white/5">&gt; HOME</Link>

          <div onClick={() => toggleMobileDropdown("apps")} className="py-3 nav-link flex items-center justify-between border-b border-white/5 cursor-pointer">
            &gt; APPLICATIONS <ChevronDown className="w-3 h-3" />
          </div>
          {mobileDropdowns.apps && (
            <div className="pl-4">
              <Link to="/applications/chair" className="block py-2 nav-link">&gt;&gt; CHAIRS APPLICATION</Link>
              <Link to="/applications/admin" className="block py-2 nav-link">&gt;&gt; ADMIN APPLICATIONS</Link>
              <Link to="/registration" className="block py-2 nav-link">&gt;&gt; REGISTRATION</Link>
            </div>
          )}

          <div onClick={() => toggleMobileDropdown("resources")} className="py-3 nav-link flex items-center justify-between border-b border-white/5 cursor-pointer">
            &gt; SUMMIT RESOURCES <ChevronDown className="w-3 h-3" />
          </div>
          {mobileDropdowns.resources && (
            <div className="pl-4">
              <Link to="/about" className="block py-2 nav-link">&gt;&gt; SUMMIT OVERVIEW</Link>
              <Link to="/committees" className="block py-2 nav-link">&gt;&gt; COMMITTEES</Link>
              <Link to="/rules-of-procedure" className="block py-2 nav-link">&gt;&gt; RULES OF PROCEDURE</Link>
              <Link to="/resources" className="block py-2 nav-link">&gt;&gt; DELEGATE RESOURCES</Link>
              <Link to="/faq" className="block py-2 nav-link">&gt;&gt; FAQ</Link>
            </div>
          )}

          <Link to="/secretariat" className="block py-3 nav-link border-b border-white/5">&gt; TEAM</Link>

          <Link to="/echits/login" className="nav-login-btn mt-4 flex items-center justify-between border border-white/30 px-4 py-3 font-mono text-xs tracking-wider uppercase text-white">
            <span>LOGIN [ E-CHITS ]</span>
            <LogIn className="w-4 h-4" />
          </Link>
        </div>
      )}
    </nav>
  );
}
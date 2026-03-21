import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">
            J
          </div>
          <span className="text-lg font-bold">
            Journey <span className="text-accent">Japan</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link href="/itineraries" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Itineraries
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Destinations
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Pro Picks
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Blog
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all">
            Log in
          </button>
          <Link
            href="/editor/new"
            className="text-sm font-medium text-white bg-accent hover:bg-accent-hover px-5 py-2 rounded-lg transition-colors"
          >
            Plan a Trip
          </Link>
        </div>
      </div>
    </header>
  );
}

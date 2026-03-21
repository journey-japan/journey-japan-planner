import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-10 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm text-gray-400">
          © 2026 Journey Japan. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">About</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Blog</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Privacy</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

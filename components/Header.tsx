import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="flex space-x-4">
      <Link href="/">
        <a className={`font-bold ${isActive('/') ? 'text-gray-500' : 'text-gray-900 hover:text-blue-600'}`}>
          Feed
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="flex space-x-4">
        <Link href="/">
          <a className={`font-bold ${isActive('/') ? 'text-gray-500' : 'text-gray-900 hover:text-blue-600'}`}>
            Feed
          </a>
        </Link>
      </div>
    );
    right = (
      <div className="ml-auto">
        <p className="text-gray-600">Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="ml-auto">
        <Link href="/api/auth/signin">
          <a className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-50 transition-colors">
            Log in
          </a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="flex space-x-4">
        <Link href="/">
          <a className={`font-bold ${isActive('/') ? 'text-gray-500' : 'text-gray-900 hover:text-blue-600'}`}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a className={`${isActive('/drafts') ? 'text-gray-500' : 'text-gray-900 hover:text-blue-600'}`}>
            My drafts
          </a>
        </Link>
      </div>
    );
    right = (
      <div className="ml-auto flex items-center space-x-4">
        <p className="text-sm text-gray-600">
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <a className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
            New post
          </a>
        </Link>
        <button 
          onClick={() => signOut()}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {left}
          {right}
        </div>
      </div>
    </nav>
  );
};

export default Header;
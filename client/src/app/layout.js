'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import './globals.css';
import { useRouter } from 'next/navigation';
import { useAuth, AuthProvider } from '@/context/AuthContext';
import { logout as performLogout } from '@/utils/auth';

function LayoutContent({ children }) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    performLogout();
    logout();
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="container-fluid vh-100">
      <header className="row bg-light border-bottom py-3">
        <div className="col-8">
          <Link href="/" className="text-decoration-none text-dark">
            <h2 className="h4 ms-3">Dashboard</h2>
          </Link>
        </div>
        <div className="col-4 text-end pe-3">
          {!isAuthenticated ? (
            <button className="btn btn-primary me-2" onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </header>
      <div className="row h-100">
        <nav className="col-md-2 col-lg-2 bg-light p-3 border-end">
          <ul className="nav flex-column">
            <li className="nav-item">
              <h4 className="text-center">
                <Link href="/tags" className="nav-link text-decoration-none">
                  Tags
                </Link>
              </h4>
            </li>
          </ul>
        </nav>
        <main className="col-md-9 col-lg-10 p-4">{children}</main>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </AuthProvider>
  );
}

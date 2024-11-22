'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import './globals.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { logout } from '@/utils/auth';

export default function RootLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token); // Update state based on token presence
    setLoading(false); // Set loading to false after checking
  }, []);

  // Handle logout action
  const handleLogout = () => {
    logout(); // Clear tokens from localStorage
    setIsAuthenticated(false); // Update state
    router.push('/login'); // Redirect to login page
  };

  const handleLogin = () => {
    router.push('/login'); // Redirect to login page
  };

  if (loading) {
    // Show a loading spinner or empty state while checking authentication
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <html lang="en">
      <body>
        <div className="container-fluid vh-100">
          {/* Header */}
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

          {/* Main Section */}
          <div className="row h-100">
            {/* Sidebar */}
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

            {/* Main Content */}
            <main className="col-md-9 col-lg-10 p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

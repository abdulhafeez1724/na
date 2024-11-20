// src/app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
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
              <button className="btn btn-primary me-2">Login</button>
              <button className="btn btn-danger">Logout</button>
            </div>
          </header>

          {/* Main Section */}
          <div className="row h-100">
            {/* Sidebar */}
            <nav className=" col-md-2 col-lg-2 bg-light p-3 border-end">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <h4 className='text-center'>
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

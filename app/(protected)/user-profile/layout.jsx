'use client';

import ProfileSidebar from '@/components/ProfileSidebar';
import { usePathname } from 'next/navigation';
import { UserProvider } from '@/contexts/UserContext';

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  return (
    <UserProvider>
      <div className="container mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-3">
            <ProfileSidebar currentPath={pathname} />
          </div>

          {/* Main content */}
          <div className="col-md-9">
            {children}
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

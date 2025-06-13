// components/Breadcrumbs.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = decodeURIComponent(segment.replace(/[-_]/g, ' '));

    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      href,
    };
  });

  return (
    <nav aria-label="breadcrumb" className="mt-3">
      <ol className="breadcrumb m-0">
        <li className="breadcrumb-item">
          <Link href="/" className="text-decoration-none">Home</Link>
        </li>
        {breadcrumbs.map((crumb, i) => (
          <li
            key={i}
            className={`breadcrumb-item ${i === breadcrumbs.length - 1 ? 'active' : ''}`}
            aria-current={i === breadcrumbs.length - 1 ? 'page' : undefined}
          >
            {i === breadcrumbs.length - 1 ? (
              <span title={crumb.label}>
                {crumb.label.length > 15 ? `${crumb.label.slice(0, 15)}...` : crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-decoration-none"
                title={crumb.label}
              >
                {crumb.label.length > 15 ? `${crumb.label.slice(0, 15)}...` : crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

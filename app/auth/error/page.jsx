'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (code) => {
    switch (code) {
      case 'OAuthAccountNotLinked':
        return 'This email is already linked with another provider. Please use the original sign-in method.';
      case 'AccessDenied':
        return 'Access denied. Please contact support.';
      case 'Configuration':
        return 'There is a server configuration issue. Please try again later.';
      case 'Your account has been deactivated. Contact support.':
        return 'Your account has been deactivated. Please contact support.';
      case 'Please verify your email before logging in.':
        return 'Your email is not verified yet. Please check your inbox.';
      case 'Invalid credentials':
        return 'Invalid username or password.';
      default:
        return decodeURIComponent(code) || 'Something went wrong. Please try again.';
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-danger">Authentication Error</h2>
      <p className="mt-3">{getErrorMessage(error)}</p>
      <Link href="/auth/login" className="btn text-white btn-action mt-4">
        Go Back to Login
      </Link>
      <Link href="/support-center" className="btn ms-3 text-white btn-action mt-4">
        Contact Support
      </Link>
    </div>
  );
}

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect();

        // Find user by email or username
        const user = await User.findOne({
          $or: [
            { username: credentials.username },
            { email: credentials.username }
          ]
        });

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        // ✅ Check email verification
        if (!user.emailVerified) {
          throw new Error('Please verify your email before logging in.');
        }

        // ✅ Check active status
        if (!user.isActive) {
          throw new Error('Your account has been deactivated. Contact support.');
        }

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/api/auth/error'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

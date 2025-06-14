import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({
          $or: [
            { username: credentials.username },
            { email: credentials.username },
          ],
        });

        if (!user) throw new Error('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) throw new Error('Invalid credentials');

        if (!user.emailVerified)
          throw new Error('Please verify your email before logging in.');
        if (!user.isActive)
          throw new Error('Your account has been deactivated. Contact support.');

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();

      const existingUser = await User.findOne({ email: user.email });

      // ✅ Block login if user is inactive
      if (existingUser && !existingUser.isActive) {
        const message = encodeURIComponent('Your account has been deactivated. Contact support.');
        return `/auth/error?error=${message}`;
      }

      return true;
    },

    async jwt({ token, user, account }) {
      await dbConnect();

      if (account && user?.email) {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await User.create({
            fullName: user.name,
            email: user.email,
            username: user.email.split('@')[0],
            emailVerified: true,
            isActive: true,
            role: 'student',
            password: '',
            provider: account.provider,
          });

          token.id = newUser._id.toString();
          token.role = newUser.role;
          token.email = newUser.email;
        } else {
          token.id = existingUser._id.toString();
          token.role = existingUser.role;
          token.email = existingUser.email;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signIn({ user }) {
      await dbConnect();

      const headersList = headers();
      const ip = headersList.get('x-ip') || 'Unknown IP';
      const location = headersList.get('x-location') || 'Unknown Location';
      const userAgent = headersList.get('user-agent') || 'Unknown Agent';

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          fullName: user.name,
          email: user.email,
          username: user.email.split('@')[0],
          emailVerified: true,
          isActive: true,
          role: 'student',
          password: '',
          provider: 'google',
        });
      } else {
        // Limit login history to last 5 entries
        existingUser.loginHistory.push({
          ip,
          userAgent,
          location,
          date: new Date(),
        });

        if (existingUser.loginHistory.length > 5) {
          existingUser.loginHistory = existingUser.loginHistory.slice(-5);
        }

        await existingUser.save();
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

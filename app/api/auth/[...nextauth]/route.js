import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    // 🔹 Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    // 🔹 Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({
          $or: [
            { username: credentials.username },
            { email: credentials.username }
          ]
        });

        if (!user) throw new Error('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) throw new Error('Invalid credentials');

        if (!user.emailVerified) throw new Error('Please verify your email before logging in.');
        if (!user.isActive) throw new Error('Your account has been deactivated. Contact support.');

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
    async jwt({ token, user, account }) {
      await dbConnect();

      // 🔹 Handle first-time Google login
      if (account && user?.email) {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await User.create({
            fullName: user.name,
            email: user.email,
            username: user.email.split('@')[0],
            emailVerified: true,
            isActive: true,
            role: 'student',
            password: '',
            provider: account.provider
          });

          token.id = newUser._id.toString();
          token.role = newUser.role;
        } else {
          token.id = existingUser._id.toString();
          token.role = existingUser.role;
        }

        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signIn({ user }) {
      await dbConnect();

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
          provider: 'google'
        });
      }
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

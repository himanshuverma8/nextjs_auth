import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
     GitHubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  profile(profile) {
    return {
      id: profile.id,
      name: profile.name || profile.login,
      email: profile.email,
      image: profile.avatar_url,
    };
  },
  authorization: { params: { scope: "read:user user:email" } },
}),
  ],
  callbacks: {
  async signIn({ profile, account }) {
  if (!profile) return false;
  await connect();

  const email = profile.email;
  const name = profile.name || profile.login || "No Name";
  const provider = account.provider; // 'google' or 'github'
  const id = profile.sub || profile.id; // sub for Google, id for GitHub

  if (!email) {
    console.log("Email not available from provider");
    return false;
  }

  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    const generatedUsername =
      email.split('@')[0] + Math.floor(Math.random() * 10000);

    await User.create({
      name,
      email,
      googleId: provider === 'google' ? id : undefined,
      githubId: provider === 'github' ? id : undefined,
      isVerfied: true,
      username: generatedUsername,
    });
  }

  return true;
},

    async jwt({ token, user, account, profile }) {
      if (profile) {
        token.email = profile.email;
      }
      return token;
    },

    async session({ session, token }) {
  if (session.user) {
    session.user.email = token.email as string;
  }
  return session;
},
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

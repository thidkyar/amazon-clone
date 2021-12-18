import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

/* if you get redirect URI error -> go to google console -> your project -> credentials -> update URLs */
export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
})
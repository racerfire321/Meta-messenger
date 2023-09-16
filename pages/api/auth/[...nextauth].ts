import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  secret:'c7f0ddb34b31a4a95ab77633080d995b8ead251ff4a92eef645d2ce6c7e64e85',
  providers: [
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    
  ],
  
  pages:{
    signIn : '/auth/signin'
  }
}

export default NextAuth(authOptions)
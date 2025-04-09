"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChromeIcon as GoogleIcon, Loader2 } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import { signInWithGoogle, signOut, onAuthStateChanged } from "@/lib/firebase"
import type { User } from "firebase/auth"

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error("Error signing in:", error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <ThemeToggle />
        {user && (
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
            <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
          </Avatar>
        )}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to Intern Assignment</h1>

        <Card className="w-full">
          <CardContent className="pt-6 flex flex-col items-center">
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : user ? (
              <div className="text-center space-y-4">
                <h2 className="text-xl font-medium">Welcome, {user.displayName}!</h2>
                <Button variant="outline" onClick={handleSignOut} className="rounded-full px-6">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={handleSignIn} className="rounded-full px-6 py-5 shadow-md">
                <GoogleIcon className="mr-2 h-5 w-5" />
                Sign in with Google
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

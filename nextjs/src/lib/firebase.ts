import { FirebaseApp, initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as firebaseAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
  Auth,
} from "firebase/auth"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let app: FirebaseApp;
let auth : Auth;
let googleProvider: GoogleAuthProvider;

try {
  // Initialize Firebase only on the client side
  if (typeof window !== "undefined") {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    googleProvider = new GoogleAuthProvider()
  }
} catch (error) {
  console.error("Firebase initialization error", error)
}

// Sign in with Google
export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) return null

  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error) {
    throw error
  }
}

// Sign out
export const signOut = async () => {
  if (!auth) return null
  return firebaseSignOut(auth)
}

// Auth state observer
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  if (!auth) return () => {}
  return firebaseAuthStateChanged(auth, callback)
}

export { auth }

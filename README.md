# 📱 Intern Assignment

This is a full-stack project built as part of an internship assignment. It demonstrates:

- A web app built with **Next.js** and **Material UI (MUI)** with **Google Sign-Up using Firebase Authentication**
- A mobile app built with **Expo (React Native)** that:
  - Embeds the web app using **WebView**
  - Implements **native Firebase Cloud Messaging (FCM)** push notifications (NOT using Expo’s own notification service)

---

## 🧰 Tech Stack

- Web: **Next.js**, **Material UI**, **Firebase Auth**
- Mobile: **Expo**, **WebView**, **@react-native-firebase/messaging**
- Notifications: **Native FCM integration via Firebase Cloud Messaging**
- Build Tool: **EAS Build (Expo Application Services)**

---

## 📂 Folder Structure

```
Intern-Assignment/
├── web/            # Next.js + MUI frontend
├── mobile/         # Expo project with WebView + FCM integration
├── README.md
```

---

## 🚀 Getting Started

### 🔹 Prerequisites

- Node.js ≥ 16
- Firebase project set up
- Android Studio or a physical Android device
- Expo CLI installed:
  ```bash
  npm install -g expo-cli
  ```

---

## 🌐 Web App Setup (Next.js + MUI + Firebase Auth)

### 📁 Navigate to `web` folder
```bash
cd web
```

### 📦 Install dependencies
```bash
npm install
```

### 🔐 Add your Firebase config
Create a `.env.local` file and include:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### ▶️ Start the web app
```bash
npm run dev
```

Your app will be running at: [http://localhost:3000](http://localhost:3000)

---

## 📱 Mobile App Setup (Expo + WebView + Native FCM)

### 📁 Navigate to `mobile` folder
```bash
cd mobile
```

### 📦 Install dependencies
```bash
npm install
```

### 🔧 Configure Firebase for Android
Make sure to:

1. Add your `google-services.json` to `mobile/android/app/`
2. Configure FCM in `AndroidManifest.xml`, `build.gradle`, etc. (already done if you followed the setup)
3. Use `@react-native-firebase/app` and `@react-native-firebase/messaging`

### 🔐 Firebase Permissions in Code
```ts
import messaging from '@react-native-firebase/messaging';

await messaging().requestPermission();
const token = await messaging().getToken();
console.log("🔑 FCM Token:", token);
```

### 🔁 FCM Listeners
Handles foreground & background messages:
```ts
messaging().onMessage(...)
messaging().setBackgroundMessageHandler(...)
```

### 🧪 Run the app using EAS
You **must** use EAS Build to test native FCM.

```bash
eas build -p android --profile development
```

Then install the `.apk` file on your device to test.

---

## 🔔 Sending Push Notifications (FCM)

1. Use the Firebase Console → Cloud Messaging → Send Message  
2. Or use cURL:

```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "YOUR_FCM_TOKEN",
    "notification": {
      "title": "Hello",
      "body": "This is a test notification"
    }
  }'
```

---

## ✅ Features Covered

- [x] Google Sign Up using Firebase Auth
- [x] Responsive and professional UI with MUI
- [x] Expo Android app with WebView integration
- [x] Native push notifications using Firebase Cloud Messaging (not Expo’s system)

---

## 🙌 Credits

Built with ❤️ by Punit for an internship assignment.

---

## 📝 Notes

> ⚠️ Native push notifications **do not work** with Expo Go — you must use an **EAS Build** with a custom dev client or install the APK.
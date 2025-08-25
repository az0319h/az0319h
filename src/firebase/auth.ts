import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Google 로그인
export async function loginWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// 로그아웃
export async function logout(): Promise<void> {
  return await signOut(auth);
}

// getMe: 현재 로그인한 유저 정보 반환
export function getMe(): User | null {
  return auth.currentUser;
}

// auth 상태 구독
export function subscribeAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

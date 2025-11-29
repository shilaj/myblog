"use client";

import { useEffect, useMemo, useState } from 'react';
import { FirebaseError, getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'firebase/auth';
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

const hasValidConfig = Object.values(firebaseConfig).every(Boolean);

function useFirebaseApp(): FirebaseApp | null {
  return useMemo(() => {
    if (!hasValidConfig) return null;
    if (!getApps().length) {
      return initializeApp(firebaseConfig);
    }
    return getApp();
  }, []);
}

type CommentRecord = {
  id: string;
  message: string;
  createdAt?: Timestamp;
  displayName?: string;
  photoURL?: string;
  uid?: string;
};

type CommentsProps = {
  threadId: string;
  title?: string;
};

export default function Comments({ threadId, title = 'Comments' }: CommentsProps) {
  const app = useFirebaseApp();
  const auth = app ? getAuth(app) : null;
  const db = app ? getFirestore(app) : null;

  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<CommentRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDomain, setCurrentDomain] = useState('this domain');

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (current: User | null) => setUser(current));
  }, [auth]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentDomain(window.location.hostname);
    }
  }, []);

  useEffect(() => {
    if (!auth) return undefined;
    getRedirectResult(auth).catch((err) => {
      const firebaseError = err as FirebaseError;
      setError(resolveAuthError(firebaseError));
      console.error(firebaseError);
    });
    return undefined;
  }, [auth]);

  useEffect(() => {
    if (!db) return undefined;
    const q = query(
      collection(db, 'comments'),
      where('threadId', '==', threadId),
      orderBy('createdAt', 'asc'),
    );
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      setEntries(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<CommentRecord, 'id'>),
        })),
      );
    });
    return unsubscribe;
  }, [db, threadId]);

  const handleAuth = async (provider: 'google' | 'facebook') => {
    if (!auth) return;
    setError(null);
    setIsRedirecting(false);
    try {
      const providerInstance =
        provider === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
      await signInWithPopup(auth, providerInstance);
    } catch (err) {
      const firebaseError = err as FirebaseError;
      if (
        firebaseError.code === 'auth/popup-blocked' ||
        firebaseError.code === 'auth/operation-not-supported-in-this-environment'
      ) {
        setIsRedirecting(true);
        try {
          const providerInstance =
            provider === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
          await signInWithRedirect(auth, providerInstance);
          return;
        } catch (redirectErr) {
          console.error(redirectErr);
          setError(resolveAuthError(redirectErr as FirebaseError));
          setIsRedirecting(false);
          return;
        }
      }
      setError(resolveAuthError(firebaseError));
      console.error(firebaseError);
    }
  };

  const handleSubmit = async () => {
    if (!db || !user || !message.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, 'comments'), {
        threadId,
        message: message.trim(),
        createdAt: serverTimestamp(),
        displayName: user.displayName ?? 'Anonymous',
        photoURL: user.photoURL ?? undefined,
        uid: user.uid,
      });
      setMessage('');
    } catch (err) {
      setError('Unable to post your comment. Please retry.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  function resolveAuthError(firebaseError: FirebaseError): string {
    switch (firebaseError.code) {
      case 'auth/unauthorized-domain':
        return `Add ${currentDomain} to Firebase Authentication → Settings → Authorized domains.`;
      case 'auth/account-exists-with-different-credential':
        return 'You already used a different provider for this email. Sign in with that provider first.';
      case 'auth/network-request-failed':
        return 'Network error – check your connection and try again.';
      case 'auth/popup-closed-by-user':
        return 'Popup closed before finishing sign-in. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'Another sign-in request is already running. Please wait or refresh.';
      default:
        return 'Authentication failed. Please try again or review your Firebase provider setup.';
    }
  }

  if (!hasValidConfig) {
    return (
      <section className="mt-12 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6 text-sm text-amber-200">
        Provide Firebase credentials via NEXT_PUBLIC_FIREBASE_* env vars to enable {title}.
      </section>
    );
  }

  return (
    <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-slate-400">Google sign-in required to participate.</p>
        </div>
        {user && (
          <button
            type="button"
            onClick={handleSignOut}
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-white"
          >
            Sign out
          </button>
        )}
      </div>

      {!user && (
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleAuth('google')}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/40"
            disabled={isRedirecting}
          >
            {isRedirecting ? 'Redirecting…' : 'Continue with Google'}
          </button>
          {/* <button
            type="button"
            onClick={() => handleAuth('facebook')}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/40"
            disabled={isRedirecting}
          >
            {isRedirecting ? 'Redirecting…' : 'Continue with Facebook'}
          </button> */}
        </div>
      )}

      {user && (
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-300">
          {user.photoURL && <img src={user.photoURL} alt="Avatar" className="h-8 w-8 rounded-full" />}
          <div>
            <p className="font-medium text-white">{user.displayName ?? 'Anonymous'}</p>
            <p className="text-xs text-slate-400">Share what resonated with you.</p>
          </div>
        </div>
      )}

      {user && (
        <div className="mt-4 space-y-3">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={3}
            placeholder="Your thoughts…"
            className="w-full rounded-2xl border border-white/20 bg-slate-900/40 p-4 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
          />
          <button
            type="button"
            disabled={isSubmitting || !message.trim()}
            onClick={handleSubmit}
            className="rounded-full border border-cyan-400 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Posting…' : 'Post comment'}
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}

      <ul className="mt-6 space-y-4">
        {entries.map((entry) => (
          <li key={entry.id} className="rounded-2xl border border-white/10 bg-slate-900/30 p-4">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              {entry.photoURL && <img src={entry.photoURL} alt={entry.displayName ?? 'Avatar'} className="h-8 w-8 rounded-full" />}
              <div>
                <p className="font-medium text-white">{entry.displayName ?? 'Anonymous'}</p>
                <p className="text-xs text-slate-500">
                  {entry.createdAt?.toDate().toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }) ?? 'Just now'}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-200">{entry.message}</p>
          </li>
        ))}
        {entries.length === 0 && <p className="text-sm text-slate-500">No comments yet — be the first!</p>}
      </ul>
    </section>
  );
}

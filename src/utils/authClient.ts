'use client'; 

import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

export async function clientSideSignOut() {
  try {
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      console.error("Logout failed:", errorData);
      toast.error(errorData.message || "Logout failed");
    } else {
      toast.success("Thanks!");
    }

    await signOut({ callbackUrl: '/' });

  } catch (error: unknown) {
    console.error("Error during sign out:", error);
    if (error instanceof Error) {
      toast.error(error.message || "Error during sign out");
    } else {
      toast.error("Error during sign out");
    }
  }
}
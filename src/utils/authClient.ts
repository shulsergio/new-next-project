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
      console.error("Backend logout failed:", errorData);
      toast.error(errorData.message || "Failed to log out from backend.");
    } else {
      toast.success("Logged out from backend successfully!");
    }

    await signOut({ callbackUrl: '/' });

  } catch (error: unknown) {
    console.error("Error during sign out process:", error);
    if (error instanceof Error) {
      toast.error(error.message || "An unexpected error occurred during sign out.");
    } else {
      toast.error("An unexpected error occurred during sign out.");
    }
  }
}
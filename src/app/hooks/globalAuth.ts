// Custom hook to manage global authentication state

import { useState, useEffect, useCallback } from "react";
import { createClient } from "../utils/supabase/client";
import { NextRouter } from "next/router";
import { useRouter } from "next/navigation";
import React from "react";

const defaultValue = {
  loading: true,
  user: null,
  redirectTo: () => {},
};
const AuthContext = React.createContext(defaultValue);

export function useAuth(router: NextRouter) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Your authentication and onboarding check logic here
    // Set the user data and loading state accordingly

    const supabase = createClient();

    // Initial session checker for new users
    console.log("Listening for auth state changes for new users...");
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "INITIAL_SESSION") {
        // Check if user exists in database
        try {
          const { data: user, error: fetchUserError } = await supabase
            .from("users")
            .select()
            .eq("id", session.user.id);
          if (fetchUserError) {
            console.error("Error fetching user from db:", fetchUserError);
            return;
          } else {
            // If user exists, redirect to dashboard
            if (user) {
              router.push("/dashboard");
            } else {
              // If user does not exist, redirect to onboarding
              router.push("/onboarding");
            }
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          router.push("/login");
        }
      }
    });
  }, []);

  const redirectTo = useCallback(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
    } else if (!user.is_onboarded) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  return { loading, user, redirectTo };
}

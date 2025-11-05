import { createContext, useState, useContext, useEffect } from 'react';
import supabase from '@/utils/supabase-client';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    //Session state (user info, sign-in status)
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        async function getInitialSession() {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    throw error;
                }
                setSession(data.session);
            } catch (error) {
                console.error('Error getting session:', error.message);
            }
        }
        getInitialSession();

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            console.log('Session changed:', session);
        });
    }, []);

    //Auth functions (signup, logout)
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            });
            if (error) {
                console.error('Supabase sign-in error:', error.message);
                return { success: false, error: error.message };
            }
            console.log('Supabase sign-in success:', data);
            return { success: true, data };
        } catch (error) {
            console.error('Unexpected error during sign-in:', error.message);
            return {
                success: false,
                error: 'An unexpected error occurred. Please try again.',
            };
        }
    };

    const signOutUser = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Supabase sign-out error:', error.message);
                return { success: false, error: error.message };
            }
            return { success: true };
        } catch (error) {
            console.error('Unexpected error during sign-out:', error.message);
            return {
                success: false,
                error: 'An unexpected error occurred during sign out.',
            };
        }
    };

    const signUpNewUser = async (email, password, firstName) => {
        if (!email || !email.includes('@')) {
            return {
                success: false,
                error: 'Please enter a valid email address.',
            };
        }
        if (!password || password.length < 6) {
            return {
                success: false,
                error: 'Password must be at least 6 characters long.',
            };
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email.toLowerCase(),
                password,
                options: {
                    data: {
                        first_name: firstName ?? '',
                    },
                },
            });
            if (error) {
                console.error('Supabase sign-up error:', error.message);
                console.error('Supabase error object:', error);
                return { success: false, error: error.message };
            }
            console.log('Supabase sign-up success:', data);
            return { success: true, data };
        } catch (error) {
            console.error('Unexpected error during sign-up:', error.message);
            return {
                success: false,
                error: 'An unexpected error occurred. Please try again.',
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{ session, signInUser, signOutUser, signUpNewUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

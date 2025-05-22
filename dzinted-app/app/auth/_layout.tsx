import { Slot, Stack, useRouter } from 'expo-router';
import { Platform, SafeAreaView, ScrollView, StyleSheet, View, StatusBar, Text } from 'react-native';
import { use, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthLayout() {
    const router = useRouter();

    const {user} = useAuth();

    useEffect(() => {
        if (!!user) {
            router.push('/');
        }
    }, [user, router]);

    return (
        <>
            <Slot />
        </>
    );
}
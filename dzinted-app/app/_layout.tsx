import { Slot, useRouter } from 'expo-router';
import { Platform, SafeAreaView, ScrollView, StyleSheet, View, StatusBar, Text } from 'react-native';
import MobileNavbar from '../components/mobile/MobileNavbar';
import WebNavbar from '../components/web/WebNavbar';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';


export default function RootLayout() {
    return (
    <AuthProvider>
        <Layout />
    </AuthProvider>
    )
}



function Layout() {

    const router = useRouter();

    const { user, error, loading } = useAuth();

    useEffect(() => {
        if (!user && !loading) {
            router.replace('/auth/login');
        }
    }, [user, router, loading]);


    if (loading) {
        return (<View><Text>Loading...</Text></View>);
    }

    if (!user) return <Slot />;


    const isWeb = Platform.OS === 'web';


    return (
        <>
            <View className='h-[95vh] pt-10'>
                {isWeb ? <WebNavbar /> : <MobileNavbar onWeb={false} />}
                <Slot />
            </View>
        </>
    );
}
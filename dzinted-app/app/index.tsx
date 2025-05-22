import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import '../global.css'
import { usePathname } from 'expo-router';

export default function Home() {
    const pathname = usePathname();

    return (
        <View className="bg-blue-500 flex justify-center align-middle items-center">
            <Text>Open up App.tsx to start working on your app!</Text>
            <Text>{pathname}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

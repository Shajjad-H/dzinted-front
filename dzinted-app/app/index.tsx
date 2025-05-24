import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import '../global.css'
import { Link, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MobileSpecificText from '../components/MobileSpecificText';
import WebSpecificText from '../components/WebSpecificText';

export default function Home() {
    const pathname = usePathname();

    const web = Platform.OS === "web"

    return (
        <SafeAreaView>
        <View className="bg-blue-500 flex justify-center align-middle items-center">
            <Text className='text-red-500'>Bienvenue sur Vintedddd</Text>
            <Text>{pathname}</Text>
           <Text className={web ? "text-white" : "text-red-500"}> Je vais styliser la couleur du texte </Text>
           <Link href={"/auth/register"} className='text-xl'>inscription</Link>

            <StatusBar style="auto" />
        </View>
        </SafeAreaView>
    );
}

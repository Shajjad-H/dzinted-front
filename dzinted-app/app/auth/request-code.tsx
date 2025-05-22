import { Button, Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";



function RequestCode() {
    const { email  } = useLocalSearchParams();
    const router = useRouter();


    return (
        <View className="flex-1 justify-center items-center bg-gray-100 p-6">
            <View className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <Text className="text-xl font-semibold mb-4 text-gray-800 text-center">Login</Text>
                <View className="mb-4">
                    <Text className="text-gray-700 mb-2">Email: {email}</Text>
                    
                </View>
                
                <Pressable className="bg-blue-600 hover:bg-blue-700 active:bg-blue-700 rounded-md py-4">
                    <Text className="text-white font-semibold text-center">Login</Text>
                </Pressable>

                <View className="flex flex-row justify-center mt-10">
                    <Pressable onPress={() => router.push('/auth/register')}>
                        <Text className="text-blue-400">register</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default RequestCode;
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";



function LoginPage() {
    const { user } = useAuth();
    const [email, setEmail] = useState('');


    return (
        <View className="flex-1 justify-center items-center bg-gray-100 p-6">
            <View className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <Text className="text-xl font-semibold mb-4 text-gray-800 text-center">Login</Text>
                <View className="mb-4">
                    <Text className="text-gray-700 mb-2">Email:</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        className="border border-gray-300 rounded-md py-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="Your email"
                        keyboardType="email-address"
                    />
                </View>
                
                <Pressable className="bg-blue-600 hover:bg-blue-700 active:bg-blue-700 rounded-md py-4">
                    <Text className="text-white font-semibold text-center">Login</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default LoginPage;
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "expo-router";
import api_client from "../../api/client";
import api_configs from "../../configs/api_configs";
import { AxiosError } from "axios";




function RegisterPage() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();

    async function handleCreateUser() {
        // TODO: do proper validation with zod or yup
        if (!email || !firstName || !lastName) {
            alert('invalide input all are required');
            return;
        }

        console.log('handleCreateUser');

        try {
            // TODO: à refaire avec tanstack query
            const res = await api_client.post(`${api_configs.base_url}/auth/register`, {
                first_name: firstName,
                last_name: lastName,
                email,
            });

            if (res.status == 200) {
                router.push('/auth/request-code?email=' + email);
                return;
            }

            throw new Error(res.error)

        } catch (error: AxiosError|any) {
            console.log(error);
            // TODO: à affciher l'erreur correctement
            
            alert(error?.response?.data?.error)
        }





    }


    return (
        <View className="flex-1 justify-center items-center bg-gray-100 p-6">
            <View className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <Text className="text-xl font-semibold mb-4 text-gray-800 text-center">Login</Text>
                <View className="mb-4">
                    <Text className="text-gray-700 mb-2">First Name*:</Text>
                    <TextInput
                        value={firstName}
                        onChangeText={setFirstName}
                        className="border border-gray-300 rounded-md py-3 px-2 text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="First Name"
                        keyboardType="default"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 mb-2">First Name*:</Text>
                    <TextInput
                        value={lastName}
                        onChangeText={setLastName}
                        className="border border-gray-300 rounded-md py-3 px-2 text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="First Name"
                        keyboardType="default"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 mb-2">Email*:</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        className="border border-gray-300 rounded-md py-3 px-2 text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="Your email"
                        keyboardType="email-address"
                    />
                </View>

                <Pressable onPress={handleCreateUser} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-700 rounded-md py-4">
                    <Text className="text-white font-semibold text-center">Créer un compte</Text>
                </Pressable>


                <View className="flex flex-row justify-center mt-10">
                    <Pressable onPress={() => router.push('/auth/login')}>
                        <Text className="text-blue-400">login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default RegisterPage;
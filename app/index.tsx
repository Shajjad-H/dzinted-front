import { View, Text, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { isAuthenticated, login } from "../providers/auth";

export default function Index() {
  if (isAuthenticated) {
    // Redirige vers les tabs si connecté pour le test de l'autorisation
    return <Redirect href="/accueil" />;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold mb-8">Bienvenue !</Text>
      <TouchableOpacity
        className="bg-green-500 px-8 py-3 rounded-lg mb-4"
        onPress={() => {
          login();
          router.replace("/accueil");
        }}
      >
        <Text className="text-white font-bold text-lg">Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 px-8 py-3 rounded-lg"
        onPress={() => {
          login();
          router.replace("/accueil");
        }}
      >
        <Text className="text-white font-bold text-lg">Inscription</Text>
      </TouchableOpacity>
    </View>
  );
}

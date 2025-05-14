import { View, Text, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { isAuthenticated, login } from "../providers/auth";
import { LogIn, UserPlus } from "lucide-react-native";
import ShoppingIllustration from "../assets/shopping.svg"; // Import du SVG

export default function Index() {
  if (isAuthenticated) {
    return <Redirect href="/accueil" />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      {/* Header */}
      <View className="items-center gap-4 ">
        <Text className="text-7xl font-bold text-green-500 tracking-tight">
          Dzinted
        </Text>
        {/* <Text className="text-lg text-gray-500 text-center">
          Vendez et achetez vos produits à prix réduit.
        </Text> */}
      </View>

      <ShoppingIllustration height={450} width={450} />

      <View className="mt-5">
        <TouchableOpacity
          className="bg-green-500 px-16 py-4 rounded-xl mb-4 flex-row items-center shadow-lg"
          onPress={() => {
            login();
            router.push("/accueil");
          }}
        >
          <LogIn color="white" size={24} style={{ marginRight: 8 }} />
          <Text className="text-white font-bold text-xl">Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 px-16 py-4 rounded-lg flex-row items-center shadow-lg"
          onPress={() => {
            login();
            router.push("/accueil");
          }}
        >
          <UserPlus color="white" size={24} style={{ marginRight: 8 }} />
          <Text className="text-white font-bold text-xl">Inscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

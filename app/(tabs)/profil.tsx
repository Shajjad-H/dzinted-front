import { View, Text, TouchableOpacity } from "react-native";
import { logout } from "../../providers/auth";
import { router } from "expo-router";

export default function Profil() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl mb-4">Profil</Text>
      <TouchableOpacity
        className="bg-red-500 px-8 py-3 rounded-lg"
        onPress={() => {
          logout();
          router.replace("/");
        }}
      >
        <Text className="text-white font-bold text-lg">Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

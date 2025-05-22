import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Accueil() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl">Bienvenue sur l'accueil !</Text>
      
      <Link href={"/(tabs)/accueil"}></Link>
    </View>
  );
}

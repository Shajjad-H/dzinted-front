import { Button, Text, View } from "react-native";

import "../global.css";

const App = () => {
  return (
    <View>
      <Text className="text-green-500 text-center mt-10 text-5xl tracking-tighter font-bold">
        Dzinted
      </Text>

      <View className="mt-10 flex gap-6">
      
        <Button title="Inscription"></Button>
        <Button title="Connexion "></Button>
      </View>
    </View>
  );
};

export default App;

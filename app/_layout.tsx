import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const Layout = () => {
  return (
    // Layout globale de l'app ou on ajoute le Provider pour respecter l'espacement selon les différents type de téléphone 
    // Stack permet de revenir en arrière avec les pages tout betement
    
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown : false}}>
        <Stack.Screen
          name="index"
          options={{ title: "Accueil", headerShown: false }}
        />
        <Stack.Screen
          name="inscription"
          options={{ title: "Inscription" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default Layout;

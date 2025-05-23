import { Tabs } from "expo-router";
import {
  House,
  Search,
  User,
  MessageCircle,

  PackagePlus,
  UserRound,
} from "lucide-react-native";
import React from "react";
import colors from "@/utils/colors";

export default function LayoutTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.gray,
      }}
    >
      <Tabs.Screen
        name="accueil"
        options={{
          tabBarIcon: ({ size, color }) => <House color={color} size={size} />,
          title:"Accueil"
        }}
      />
      <Tabs.Screen
        name="rechercher"
        options={{
          tabBarIcon: ({ size, color }) => <Search color={color} size={size} />,
          title: "Rechercher",
        }}
      />



      <Tabs.Screen
        name="vendre"
        options={{
          tabBarIcon: ({ size, color }) => (
            <PackagePlus color={color} size={size} />
          ),
          title: "Vendre",
        }}
      />

      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MessageCircle color={color} size={size} />
          ),
          title: "Message",
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ size, color }) => (
            <UserRound color={color} size={size} />
          ),
          title: "Profil",
        }}
      />
    </Tabs>
  );
}

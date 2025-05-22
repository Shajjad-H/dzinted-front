import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Input, InputField } from "@/components/ui/input";
import LogoGoogle from "@/assets/Google-Icon--Streamline-Svg-Logos.svg";
import LogoMarque from "@/assets/Globe-Showing-Europe-Africa--Streamline-Emoji.svg";
import { router } from "expo-router";
import { login } from "@/providers/auth"; // Tu l'utilises, donc je le garde
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SchemaConnexion } from "@/schema/SchemaConnexion";

type SchemaConnexionType = z.infer<typeof SchemaConnexion>;

const Connexion = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaConnexionType>({
    defaultValues:{
      email : "yacine69800@live.fr"
    },
    resolver: zodResolver(SchemaConnexion),
   
  });

  const SubmitFormConnexion = (data: SchemaConnexionType) => {
    console.log("Données de connexion:", data);
 
    reset()
    login(); // Exemple 
    router.push("/(tabs)/accueil"); // Redirection si succès 
    // reset(); // Tu pourrais vouloir reset le formulaire après une tentative, ou seulement si succès
  };

  return (
    <View className="flex-1 bg-white p-6 mt-16">
      <View className="items-center mb-8 mt-10">
        <LogoMarque width={150} height={150}></LogoMarque>
      </View>

      <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
        Connectez-vous
      </Text>

      <View className="flex gap-4">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Email
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                variant="outline"
                size="lg"
                className="bg-gray-50 border border-gray-300 rounded-lg"
              >
                <InputField
                  placeholder="votre@email.com"
                  keyboardType="email-address"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="none" // Bonne pratique pour les emails
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-md mt-1">
              {errors.email.message}
            </Text>
          )}
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                variant="outline"
                size="lg"
                className="bg-gray-50 border border-gray-300 rounded-lg"
              >
                <InputField
                  placeholder="••••••••"
                  secureTextEntry={true}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-md mt-1">
              {errors.password.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          className="self-end"
          onPress={() => console.log("Mot de passe oublié")} // Ou router.push('/mot-de-passe-oublie')
        >
          <Text className="text-blue-600 font-medium">
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`${
            isSubmitting ? "bg-blue-400" : "bg-blue-600"
          } py-3 rounded-lg mt-4`}
          onPress={handleSubmit(SubmitFormConnexion)}
          disabled={isSubmitting}
        >
          <Text className="text-white text-lg font-semibold text-center">
            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center my-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">ou</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-white border border-gray-300 rounded-lg py-3"
          onPress={() => console.log("Connexion avec Google")}
        >
          <View className="mr-4">
            <LogoGoogle width={20} height={20}></LogoGoogle>
          </View>
          <Text className="text-gray-700 text-lg font-medium">
            Connexion avec Google
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Vous n'avez pas de compte ?</Text>
          <TouchableOpacity onPress={() => router.push("/inscription")}>
            <Text className="text-blue-600 font-medium ml-1">S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Connexion;

import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router } from "expo-router";
import { SchemaRegister } from "../../schema/SchemaRegister";

type SchemaRegisterType = z.infer<typeof SchemaRegister>;

const Inscription = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaRegisterType>({
    defaultValues: {
      email: "",
      last_name: "",
      first_name: "",
    },
    resolver: zodResolver(SchemaRegister),
  });

  const SubmitFormInscription = (data: SchemaRegisterType) => {
    console.log("Données d'inscription:", data);
    reset();
   
  };

  // Styles responsive
  const inputClass =
    Platform.OS === "web"
      ? "border border-gray-300 rounded-lg px-4 py-3 text-lg bg-gray-50 focus:border-blue-500 outline-none  placeholder:text-gray-400"
      : "border border-gray-300 rounded-lg px-3 py-2 text-base bg-gray-50";

  const labelClass =
    Platform.OS === "web"
      ? "text-base font-medium text-gray-700 mb-1"
      : "text-sm font-medium text-gray-700 mb-1";

  return (
    <View className="flex-1 bg-white p-6 mt-16 items-center ">
      <View
        style={
          Platform.OS === "web"
            ? { width: "50%", minWidth: 320, maxWidth: 500 }
            : { width: "100%" }
        }
        className="w-full"
      >
        <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
          Inscription
        </Text>

        <View className="flex gap-4">
          {/* Email */}
          <View>
            <Text className={labelClass}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={inputClass}
                  placeholder="votre@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  textContentType="emailAddress"
                  autoCorrect={false}
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-md mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Nom */}
          <View>
            <Text className={labelClass}>Nom</Text>
            <Controller
              control={control}
              name="last_name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={inputClass}
                  placeholder="Votre nom"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="words"
                />
              )}
            />
            {errors.last_name && (
              <Text className="text-red-500 text-md mt-1">
                {errors.last_name.message}
              </Text>
            )}
          </View>

          {/* Prénom */}
          <View>
            <Text className={labelClass}>Prénom</Text>
            <Controller
              control={control}
              name="first_name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={inputClass}
                  placeholder="Votre prénom"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="words"
                />
              )}
            />
            {errors.first_name && (
              <Text className="text-red-500 text-md mt-1">
                {errors.first_name.message}
              </Text>
            )}
          </View>

          {/* Bouton inscription */}
          <TouchableOpacity
            className={`${
              isSubmitting ? "bg-blue-400" : "bg-blue-600"
            } py-3 rounded-lg mt-4`}
            onPress={handleSubmit(SubmitFormInscription)}
            disabled={isSubmitting}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
            </Text>
          </TouchableOpacity>

          {/* Lien vers connexion */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Déjà un compte ?</Text>
            <TouchableOpacity onPress={() => router.push("/auth/login")}>
              <Text className="text-blue-600 font-medium ml-1">
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Inscription;

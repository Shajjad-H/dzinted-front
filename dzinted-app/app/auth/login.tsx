import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { SchemaLogin } from "../../schema/SchemaLogin";
import { OTPCode } from "../../utils/OTPCode";
import FormOTP from "../../components/FormOTP/FormOTP";

type SchemaLoginType = z.infer<typeof SchemaLogin>;

const LoginPage = () => {
  const router = useRouter();

  // State pour afficher le formulaire OTP
  const [showFormOTP, setShowFormOTP] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");

  // State pour le code OTP et son expiration
  const [otpCode, setOtpCode] = useState(() => OTPCode().CodeOTP);
  const [otpExpiration, setOtpExpiration] = useState(() => OTPCode().expirationCode);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaLoginType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(SchemaLogin),
  });

  // Génère un nouveau code OTP et met à jour le state
  const handleResendOTP = () => {
    const { CodeOTP, expirationCode } = OTPCode();
    setOtpCode(CodeOTP);
    setOtpExpiration(expirationCode);
    console.log("Nouveau code OTP :", CodeOTP, "Expire à :", expirationCode);
  };

  function handleRequestCode(data: SchemaLoginType) {
    // Génère un code OTP à chaque demande de connexion
    handleResendOTP();
    setShowFormOTP(true);
    setEmailForOtp(data.email);
    reset();
  }

  // Styles responsive
  const inputClass =
    Platform.OS === "web"
      ? "border border-gray-300 rounded-lg px-4 py-3 text-lg bg-gray-50 focus:border-blue-500 outline-none placeholder:text-gray-400"
      : "border border-gray-300 rounded-lg px-3 py-2 text-base bg-gray-50";

  const labelClass =
    Platform.OS === "web"
      ? "text-base font-medium text-gray-700 mb-1"
      : "text-sm font-medium text-gray-700 mb-1";

  if (showFormOTP) {
    return (
      <FormOTP
        code={otpCode}
        expiration={otpExpiration}
        emailForOtp={emailForOtp}
        onResendOTP={handleResendOTP}
      />
    );
  }

  return (
    <View className="flex-1 bg-white p-6 mt-16 items-center">
      <View
        style={
          Platform.OS === "web"
            ? { width: "50%", minWidth: 320, maxWidth: 500 }
            : { width: "100%" }
        }
        className="w-full"
      >
        <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
          Connexion
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

          {/* Bouton connexion */}
          <TouchableOpacity
            className={`${
              isSubmitting ? "bg-blue-400" : "bg-blue-600"
            } py-3 rounded-lg mt-4`}
            onPress={handleSubmit(handleRequestCode)}
            disabled={isSubmitting}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {isSubmitting ? "Connexion en cours..." : "Se connecter"}
            </Text>
          </TouchableOpacity>

          {/* Lien vers inscription */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Pas encore de compte ?</Text>
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text className="text-blue-600 font-medium ml-1">
                S'inscrire
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

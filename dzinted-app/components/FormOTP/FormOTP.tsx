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
import {
  SchemaInputOTP,
  SchemaInputOTPType,
} from "../../schema/SchemaInputOTP";

interface OTPInfoProps {
  emailForOtp: string;
  code: number;
  expiration: Date;
  onResendOTP: () => void;
}

export default function FormOTP({
  emailForOtp,
  code,
  expiration,
  onResendOTP,
}: OTPInfoProps) {
  const [errorMessageOTP, setErrorMessageOTP] = useState("");
  const [successMessageOTP, setSuccessMessageOTP] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaInputOTPType>({
    resolver: zodResolver(SchemaInputOTP),
    defaultValues: { otp: "" },
  });

  const onValidate = (data: SchemaInputOTPType) => {
    setErrorMessageOTP("");
    if (data.otp === code.toString()) {
      setSuccessMessageOTP("Code Valide");
      reset();
    } else {
      setSuccessMessageOTP("");
      setErrorMessageOTP("Code OTP Invalide");
    }
  };

  const inputClass =
    Platform.OS === "web"
      ? "border border-gray-300 rounded-lg px-4 py-3 text-lg bg-gray-50 focus:border-blue-500 outline-none placeholder:text-gray-400"
      : "border border-gray-300 rounded-lg px-3 py-2 text-base bg-gray-50";
  const labelClass =
    Platform.OS === "web"
      ? "text-base font-medium text-gray-700 mb-1"
      : "text-sm font-medium text-gray-700 mb-1";

  return (
    <View className="flex-1 bg-white p-6 mt-16 items-center">
      <View
        style={
          Platform.OS === "web"
            ? { width: "50%", minWidth: 320, maxWidth: 500 }
            : { width: "100%" }
        }
      >
        <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
          Vérification OTP
        </Text>

        <Text className="mb-2 text-gray-600">
          Code envoyé à{" "}
          <Text className="font-medium text-gray-800">{emailForOtp}</Text>
        </Text>
        <Text className="mb-4 text-gray-500">
          Expire à {expiration.toLocaleTimeString()}
        </Text>

        <Text className={labelClass}>Votre code OTP</Text>
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={inputClass}
              placeholder="000000"
              keyboardType="numeric"
              maxLength={6}
              onBlur={onBlur}
              onChangeText={(text) => {
                setErrorMessageOTP("");
                setSuccessMessageOTP("");
                onChange(text);
              }}
              value={value}
            />
          )}
        />
        {errors.otp && (
          <Text className="text-red-500 text-sm mt-1">
            {errors.otp.message}
          </Text>
        )}

        {errorMessageOTP.length > 1 && (
          <Text className="text-red-500 text-sm mt-1">
            {errorMessageOTP}
          </Text>
        )}

        {successMessageOTP.length > 1 && (
          <Text className="text-green-500 text-sm mt-1">
            {successMessageOTP}
          </Text>
        )}

        <TouchableOpacity
          className={`${
            isSubmitting ? "bg-blue-400" : "bg-blue-600"
          } py-3 rounded-lg mt-6`}
          onPress={handleSubmit(onValidate)}
          disabled={isSubmitting}
        >
          <Text className="text-white text-lg font-semibold text-center">
            {isSubmitting ? "Vérification..." : "Valider le code"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-8" onPress={onResendOTP}>
          <Text className="text-center text-md font-medium text-blue-500">
            Renvoyez le code OTP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

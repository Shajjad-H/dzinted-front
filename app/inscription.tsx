
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Input, InputField } from '@/components/ui/input';
import LogoGoogle from "@/assets/Google-Icon--Streamline-Svg-Logos.svg"
import LogoMarque from "@/assets/Globe-Showing-Europe-Africa--Streamline-Emoji.svg"
import { router } from 'expo-router';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaInscription } from '@/schema/SchemaInscription';
import { z } from 'zod';

type SchemaInscriptionType = z.infer<typeof SchemaInscription>;

const Inscription = () => {
    const { control, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm<SchemaInscriptionType>({ 
      resolver: zodResolver(SchemaInscription), 
      defaultValues : {
        email : "hocine@mail.com"
      }
    });

    const SubmitForm = (data: SchemaInscriptionType) => {
      console.log("Données du formulaire:", data);
      // Ici on va consommer l'api 
      reset() // Ici c'est pour reset le formulaire 
      // router.push("/connexion") a rediriger si la réponse de l'api est bonne 
    }
    
  return (
    <View className="flex-1 bg-white p-6 mt-16">
   
      <View className="items-center mb-8 mt-10">
       <LogoMarque width={150} height={150}></LogoMarque>
      </View>
     
      <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
        Bienvenue sur DzInted
      </Text>

      <View className="flex gap-4">
      
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">Pseudo</Text>
          <Controller
            control={control}
            name="pseudo"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                variant="outline"
                size="lg"
                className="bg-gray-50 border border-gray-300 rounded-lg"
              
              >
                <InputField 
                  placeholder="Votre pseudo" 
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.pseudo && (
            <Text className="text-red-500 text-md mt-1">{errors.pseudo.message}</Text>
          )}
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
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
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-md mt-1">{errors.email.message}</Text>
          )}
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">Mot de passe</Text>
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
            <Text className="text-red-500 text-md mt-1">{errors.password.message}</Text>
          )}
        </View>
    
        <TouchableOpacity 
          className={`${isSubmitting ? 'bg-blue-400' : 'bg-blue-600'} py-3 rounded-lg mt-4`}
          onPress={handleSubmit(SubmitForm)}
          disabled={isSubmitting}
        >
          <Text className="text-white text-lg font-semibold text-center">
            {isSubmitting ? 'Inscription en cours...' : 'Inscription'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center my-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">ou</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity 
          className="flex-row items-center justify-center bg-white border border-gray-300 rounded-lg py-3"
          onPress={() => console.log('Connexion avec Google')}
        >
          <View className="mr-4">
            <LogoGoogle width={20} height={20}></LogoGoogle>
          </View>
          <Text className="text-gray-700 text-lg font-medium">Connexion avec Google</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Vous avez déjà un compte ?</Text>
          <TouchableOpacity onPress={() => router.push('/connexion')}>
            <Text className="text-blue-600 font-medium ml-1">Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Inscription;
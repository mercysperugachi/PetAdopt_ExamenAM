import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export const HomeScreen = () => {
  return (
    <View className="flex-1 bg-background items-center justify-center p-6">
      
      {/* ESPACIO PARA LOTTIE: 
          Aquí irá una de las 3 animaciones obligatorias. 
          Descarga un archivo .json de un perrito/gatito en Lottiefiles y ponlo en src/core/assets/ 
      */}
      <View className="w-64 h-64 bg-white rounded-3xl items-center justify-center shadow-md mb-8">
        <Text className="text-gray-400 text-center px-4">
          [Aquí irá la animación Lottie del Splash/Bienvenida]
        </Text>
      </View>

      <Text className="text-4xl font-extrabold text-gray-800 mb-2">
        PetAdopt
      </Text>
      <Text className="text-lg text-gray-600 text-center mb-10">
        Encuentra a tu compañero perfecto con empatía y alegría.
      </Text>

      <TouchableOpacity className="w-full bg-primary py-4 rounded-xl items-center mb-4">
        <Text className="text-white font-bold text-lg">Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity className="w-full bg-white border border-primary py-4 rounded-xl items-center">
        <Text className="text-primary font-bold text-lg">Registrar como Refugio</Text>
      </TouchableOpacity>

    </View>
  );
};
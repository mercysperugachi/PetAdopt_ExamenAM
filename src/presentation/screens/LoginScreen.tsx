import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'expo-router';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    if(email && password) login(email, password);
  };

  return (
    <View className="flex-1 bg-[#FDF9F1] justify-center px-6">
      
      {/* Header / Logo */}
      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-[#16A085] rounded-full items-center justify-center mb-4">
          <Text className="text-3xl">🐾</Text>
        </View>
        <Text className="text-3xl font-bold text-[#0D5C4C]">PetAdopt</Text>
        <Text className="text-gray-600 text-center mt-2">
          Encuentra a tu compañero perfecto con empatía y alegría.
        </Text>
      </View>

      {/* Tarjeta de Login */}
      <View className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-1">Bienvenido de nuevo</Text>
        <Text className="text-gray-500 mb-6">Inicia sesión en tu cuenta para continuar</Text>

        {/* Botón Google (Visual por ahora) */}
        <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 py-3 rounded-full mb-6">
          <Text className="font-semibold text-gray-700">G  Continuar con Google</Text>
        </TouchableOpacity>

        <Text className="text-gray-700 font-medium mb-2">Correo Electrónico</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="hola@ejemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-700 font-medium">Contraseña</Text>
          <TouchableOpacity>
            <Text className="text-[#16A085] text-sm font-medium">¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-gray-800"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error && <Text className="text-red-500 mb-4 text-center">{error}</Text>}

        <TouchableOpacity
          className="bg-[#0D5C4C] py-4 rounded-full items-center mb-6"
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">Iniciar Sesión ➔</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mb-6">
          <Text className="text-gray-600">¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text className="text-[#16A085] font-bold">Regístrate</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-[#FFF0F0] py-4 rounded-full items-center border border-[#FFE0E0]">
          <Text className="text-[#C0392B] font-bold text-base">🏠 Registrar como Refugio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'expo-router';

export const RegisterScreen = () => {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();
  
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'adoptante' | 'refugio'>('adoptante');

  const handleRegister = async () => {
    if (email && password && nombre) {
      await register(email, password, nombre, rol);
      // Si el registro es exitoso, Supabase enviará un correo de confirmación.
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#FDF9F1] px-6 pt-10">
      
      <View className="mb-6 mt-8">
        <Text className="text-3xl font-bold text-[#0D5C4C] mb-2">Tu viaje comienza aquí</Text>
        <Text className="text-gray-600">
          Completa tu perfil para unirte a nuestra red de amor y responsabilidad.
        </Text>
      </View>

      <View className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-10">
        
        {/* Selector de Rol */}
        <View className="flex-row bg-gray-100 p-1 rounded-full mb-6">
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-full items-center ${rol === 'adoptante' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setRol('adoptante')}
          >
            <Text className={`font-bold ${rol === 'adoptante' ? 'text-[#0D5C4C]' : 'text-gray-500'}`}>Adoptante</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-full items-center ${rol === 'refugio' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setRol('refugio')}
          >
            <Text className={`font-bold ${rol === 'refugio' ? 'text-[#0D5C4C]' : 'text-gray-500'}`}>Refugio</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-700 font-medium mb-2">Nombre Completo / Refugio</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="Ej: Ana García o Refugio Huellas"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text className="text-gray-700 font-medium mb-2">Correo Electrónico</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="tu@ejemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-gray-700 font-medium mb-2">Contraseña</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-gray-800"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error && <Text className="text-red-500 mb-4 text-center">{error}</Text>}

        <TouchableOpacity
          className="bg-[#0D5C4C] py-4 rounded-full items-center mb-6"
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">Finalizar Registro ➔</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-2">
          <Text className="text-gray-600">¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-[#16A085] font-bold">Inicia sesión aquí</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};
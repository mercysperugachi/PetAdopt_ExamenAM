import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useMascotasStore } from '../store/mascotasStore';
import { useAuthStore } from '../store/authStore';

export const RegisterMascotaScreen = () => {
  const router = useRouter();
  const { agregarMascota, isLoading } = useMascotasStore();
  const { user } = useAuthStore(); // Necesitamos el ID del refugio logueado

  // Estados del formulario
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState<'perro' | 'gato' | 'otro'>('perro');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Función para abrir la galería
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7, // Comprimimos un poco para no saturar el Storage
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Función para guardar
  const handleGuardar = async () => {
    if (!imageUri || !nombre || !edad || !descripcion) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios y sube una foto.');
      return;
    }

    if (!user?.id) {
      Alert.alert('Error', 'No se encontró la sesión del refugio.');
      return;
    }

    const exito = await agregarMascota({
      nombre,
      tipo: especie,
      edad: parseInt(edad, 10),
      descripcion: `${raza ? raza + ' - ' : ''}${descripcion}`,
      refugioId: user.id, 
    }, imageUri);

    if (exito) {
      Alert.alert('¡Éxito!', 'Mascota registrada correctamente.');
      router.back(); // Regresamos a la pantalla anterior
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#FDF9F1] px-6 pt-10">
      
      {/* Cabecera */}
      <View className="mb-6 mt-4">
        <Text className="text-3xl font-bold text-[#0D5C4C] mb-2">Registro de Mascota</Text>
        <Text className="text-gray-600">
          Ayúdanos a encontrar el hogar perfecto para este nuevo integrante del refugio.
        </Text>
      </View>

      {/* Zona de Subida de Foto */}
      <TouchableOpacity 
        className="h-48 bg-[#EBF5F3] border-2 border-dashed border-[#A3D9CE] rounded-3xl items-center justify-center mb-2 overflow-hidden"
        onPress={pickImage}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="items-center">
            <Text className="text-4xl mb-2">📸</Text>
            <Text className="text-[#0D5C4C] font-medium">Subir Foto Principal</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text className="text-gray-400 text-xs italic text-center mb-8">
        Tip: Fotos con luz natural y fondo despejado aumentan las posibilidades de adopción en un 40%.
      </Text>

      {/* Formulario: Información Básica */}
      <View className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-6">
        <Text className="text-[#0D5C4C] font-bold text-lg mb-4">ⓘ Información Básica</Text>
        
        <Text className="text-gray-700 font-medium mb-2">Nombre de la mascota</Text>
        <TextInput
          className="bg-[#F4F6F6] rounded-xl px-4 py-3 mb-4 text-gray-800"
          placeholder="Ej. Luna"
          value={nombre}
          onChangeText={setNombre}
        />

        <View className="flex-row gap-4 mb-4">
          <View className="flex-1">
            <Text className="text-gray-700 font-medium mb-2">Especie</Text>
            <View className="flex-row bg-[#F4F6F6] rounded-xl overflow-hidden">
              <TouchableOpacity 
                className={`flex-1 py-3 items-center ${especie === 'perro' ? 'bg-[#A3D9CE]' : ''}`}
                onPress={() => setEspecie('perro')}
              >
                <Text className={`font-medium ${especie === 'perro' ? 'text-[#0D5C4C]' : 'text-gray-500'}`}>Perro</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`flex-1 py-3 items-center ${especie === 'gato' ? 'bg-[#A3D9CE]' : ''}`}
                onPress={() => setEspecie('gato')}
              >
                <Text className={`font-medium ${especie === 'gato' ? 'text-[#0D5C4C]' : 'text-gray-500'}`}>Gato</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-gray-700 font-medium mb-2">Edad (Años)</Text>
            <TextInput
              className="bg-[#F4F6F6] rounded-xl px-4 py-3 text-gray-800 text-center"
              placeholder="Ej. 2"
              keyboardType="numeric"
              value={edad}
              onChangeText={setEdad}
            />
          </View>
        </View>

        <Text className="text-gray-700 font-medium mb-2">Raza / Mezcla (Opcional)</Text>
        <TextInput
          className="bg-[#F4F6F6] rounded-xl px-4 py-3 mb-2 text-gray-800"
          placeholder="Ej. Golden Retriever"
          value={raza}
          onChangeText={setRaza}
        />
      </View>

      {/* Formulario: Historia y Personalidad */}
      <View className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-8">
        <Text className="text-[#0D5C4C] font-bold text-lg mb-4">📄 Historia y Personalidad</Text>
        
        <Text className="text-gray-700 font-medium mb-2">Descripción corta</Text>
        <TextInput
          className="bg-[#F4F6F6] rounded-xl px-4 py-3 text-gray-800 h-28"
          placeholder="Cuéntanos un poco sobre su llegada al refugio y su carácter..."
          multiline
          textAlignVertical="top"
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>

      {/* Botones de Acción */}
      <TouchableOpacity
        className="bg-[#0D5C4C] py-4 rounded-full items-center mb-4"
        onPress={handleGuardar}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg">💾 Guardar Registro</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white border-2 border-[#0D5C4C] py-4 rounded-full items-center mb-12"
        onPress={() => router.back()}
        disabled={isLoading}
      >
        <Text className="text-[#0D5C4C] font-bold text-lg">Cancelar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};
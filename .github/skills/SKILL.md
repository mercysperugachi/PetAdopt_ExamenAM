# Plan de Desarrollo PetAdopt - Arquitectura Clean

## 1. Stack Tecnológico
- [cite_start]**Framework Móvil:** React Native con Expo[cite: 5].
- [cite_start]**Backend:** Supabase (Auth, PostgreSQL RLS, Storage)[cite: 6].
- [cite_start]**Sitio Web Auxiliar:** Vercel (Para confirmación de cuenta y reseteo de contraseña)[cite: 7].
- [cite_start]**IA Conversacional:** API de Gemini (Asistente virtual de salud y cuidado)[cite: 8].
- [cite_start]**Mapas:** Leaflet + OpenStreetMap (Geolocalización de refugios)[cite: 9].
- [cite_start]**Diseño UI:** NativeWind (Tailwind CSS) y librerías externas (Sin uso de stylesheets tradicionales).
- [cite_start]**Animaciones:** Lottie React Native (Uso de al menos 3 animaciones obligatorias).
- **Estado Global:** Zustand.
- **Navegación:** Expo Router.

## 2. Estructura de Carpetas (Arquitectura Clean)
[cite_start]El proyecto se dividirá en 3 capas principales para asegurar el desacoplamiento técnico y facilitar la defensa del código[cite: 53, 54]:

```text
src/
├── domain/           # Capa de Reglas de Negocio (Independiente de librerías)
│   ├── entities/     # Modelos (Mascota, Usuario, Refugio, Solicitud)
│   ├── repositories/ # Interfaces de conexión
│   └── useCases/     # Lógica pura (RegistrarMascota, SolicitarAdopcion)
├── data/             # Capa de Implementación de Datos
│   ├── models/       # DTOs (Data Transfer Objects)
│   ├── repositories/ # Implementación de las interfaces del Domain
│   └── sources/      # APIs externas (Supabase, Gemini API, OSM API)
├── presentation/     # Capa de Interfaz de Usuario (React Native)
│   ├── components/   # Componentes UI reutilizables
│   ├── navigation/   # Configuración de rutas
│   ├── screens/      # Pantallas principales
│   └── store/        # Zustand para manejo de estado
└── core/             # Utilidades, hooks globales y constantes
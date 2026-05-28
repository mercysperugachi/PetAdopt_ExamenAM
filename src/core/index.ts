// Utilidades, hooks globales y constantes
// Aquí puedes agregar funciones utilitarias, hooks y constantes globales

export const APP_NAME = 'PetAdopt';

export function useIsMounted() {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted;
}

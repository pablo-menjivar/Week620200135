import { useState, useEffect } from "react";
import { Alert } from "react-native";
 
const useFetchUser = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  // Estados para la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };
  // Guardar nuevo usuario en la API
  const handleGuardar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });
      if (response.ok) {
        Alert.alert("Éxito", "Usuario guardado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo guardar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar los datos");
    }
  };
  // Actualizar usuario existente en la API
  const handleActualizar = async (userId, userData, navigation, onRefreshCallback) => {
    if (!userData.nombre || !userData.edad || !userData.correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: userData.nombre,
          edad: parseInt(userData.edad),
          correo: userData.correo,
        }),
      });
      if (response.ok) {
        Alert.alert("Éxito", "Usuario actualizado correctamente", [
          {
            text: "OK",
            onPress: () => {
              // Refrescar la lista si se proporciona callback
              if (onRefreshCallback) {
                onRefreshCallback();
              }
              if (navigation) navigation.goBack(); // Regresar a la pantalla anterior
            },
          },
        ]);
      } else {
        Alert.alert("Error", "No se pudo actualizar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al actualizar los datos");
    }
  };
  // Eliminar usuario
  const handleEliminar = async (userId, userName, onRefreshCallback) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que deseas eliminar a ${userName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${userId}`, {
                method: "DELETE",
              });
              if (response.ok) {
                Alert.alert("Éxito", "Usuario eliminado correctamente");
                // Refrescar la lista si se proporciona callback
                if (onRefreshCallback) {
                  onRefreshCallback();
                }
              } else {
                Alert.alert("Error", "No se pudo eliminar el usuario");
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Ocurrió un error al eliminar el usuario");
            }
          },
        },
      ]
    );
  };
  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsuarios();
    console.log("actualizando en useEffect");
  }, []);
  return {
    nombre,
    setNombre,
    edad,
    setEdad,
    correo,
    setCorreo,
    handleGuardar,
    handleActualizar,
    usuarios,
    loading,
    fetchUsuarios,
    handleEliminar
  };
};
export default useFetchUser;
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
  // Eliminar usuario
  const handleEliminar = async (userId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este usuario?",
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
                fetchUsuarios(); // Actualizar lista
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
  // Editar usuario
  const handleEditar = async (userId, nuevoNombre, nuevaEdad, nuevoCorreo) => {
    if (!nuevoNombre || !nuevaEdad || !nuevoCorreo) {
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
          nombre: nuevoNombre,
          edad: parseInt(nuevaEdad),
          correo: nuevoCorreo,
        }),
      });
      if (response.ok) {
        Alert.alert("Éxito", "Usuario actualizado correctamente");
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo actualizar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al actualizar el usuario");
    }
  };
  // Función para mostrar el alert de edición
  const mostrarAlertEdicion = (user) => {
    let nuevoNombre = user.nombre;
    let nuevaEdad = user.edad.toString();
    let nuevoCorreo = user.correo;
    
    Alert.prompt(
      "Editar Usuario",
      "Nombre:",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Siguiente",
          onPress: (nombre) => {
            if (!nombre) {
              Alert.alert("Error", "El nombre no puede estar vacío");
              return;
            }
            nuevoNombre = nombre;
            
            Alert.prompt(
              "Editar Usuario",
              "Edad:",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Siguiente",
                  onPress: (edad) => {
                    if (!edad || isNaN(edad)) {
                      Alert.alert("Error", "La edad debe ser un número válido");
                      return;
                    }
                    nuevaEdad = edad;
                    
                    Alert.prompt(
                      "Editar Usuario",
                      "Correo:",
                      [
                        {
                          text: "Cancelar",
                          style: "cancel",
                        },
                        {
                          text: "Guardar",
                          onPress: (correo) => {
                            if (!correo) {
                              Alert.alert("Error", "El correo no puede estar vacío");
                              return;
                            }
                            nuevoCorreo = correo;
                            handleEditar(user.id, nuevoNombre, nuevaEdad, nuevoCorreo);
                          },
                        },
                      ],
                      "plain-text",
                      user.correo
                    );
                  },
                },
              ],
              "numeric",
              user.edad.toString()
            );
          },
        },
      ],
      "plain-text",
      user.nombre
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
    usuarios,
    loading,
    fetchUsuarios,
    handleEliminar,        // Agregar esta línea
    mostrarAlertEdicion
  };
};
export default useFetchUser;
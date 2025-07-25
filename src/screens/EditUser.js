import { useState } from "react";
import { Text, TextInput, StyleSheet, ScrollView } from "react-native";
import Buttons from "../components/Button";
import useFetchUser from "../hooks/useFetchUser";

const EditUser = ({ route, navigation }) => {
  // Obtener el usuario desde los parámetros de navegación
  const { user, onRefreshList } = route.params;
  // Estados del formulario inicializados con los datos del usuario
  const [nombre, setNombre] = useState(user.nombre);
  const [edad, setEdad] = useState(user.edad.toString());
  const [correo, setCorreo] = useState(user.correo);
  // Usar el hook personalizado para obtener la función de actualizar
  const { handleActualizar } = useFetchUser();
  // Función para manejar la actualización
  const onActualizar = () => {
    const userData = { nombre, edad, correo };
    handleActualizar(user.id, userData, navigation, onRefreshList);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <Text style={styles.subtitle}>
        Modifica la información del usuario
      </Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} placeholderTextColor="#A1866F"/>
      <TextInput style={styles.input} placeholder="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" placeholderTextColor="#A1866F"/>
      <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" placeholderTextColor="#A1866F"/>
      <Buttons text="Actualizar" action={onActualizar}/>
      <Buttons text="Cancelar" action={() => navigation.goBack()}/>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#EAD8C0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#5C3D2E",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#5C3D2E",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#5C3D2E",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: "#FFF",
    color: "#000",
  },
});
export default EditUser
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Buttons from "../Button";
import useFetchUser from "../../hooks/useFetchUser";
// Componente para mostrar la tarjeta de usuario
// Este componente recibe un objeto `user` como prop y muestra sus detalles
const CardUser = ({ user, onEliminar }) => {
  const navigation = useNavigation();
  // Función para navegar a la pantalla de edición
  const handleEdit = () => {
    navigation.navigate("EditUser", { user, onRefreshList });
  };
  // Función para eliminar usuario usando el hook
  const handleDelete = () => {
    onEliminar(user.id, user.nombre);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{user.nombre}</Text>
      <Text style={styles.cardText}>Edad: {user.edad}</Text>
      <Text style={styles.cardText}>Correo: {user.correo}</Text>
      {/* Contenedor para los botones */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Buttons text="Editar" action={handleEdit} />
        </View>
        <View style={styles.buttonWrapper}>
          <Buttons text="Eliminar" action={handleDelete} />
        </View>
      </View>
    </View>
  );
};
// Estilos para el componente CardUser
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8C0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  listContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 10,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B2C24",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#3B2C24",
    marginBottom: 3,
  },
  // Nuevos estilos para los botones
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});
export default CardUser;
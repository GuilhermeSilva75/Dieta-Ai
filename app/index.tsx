import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
      />

      <Text style={styles.title}>
        Dieta<Text style={{ color: colors.white }}>.Ai</Text>
      </Text>

      <Text style={styles.text}>
        Sua dieta personalizada com inteligência artificial
      </Text>

      <Link href="/step" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gerenciar dieta</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.green
  },
  text: {
    fontSize: 16,
    color: colors.white,
    width: 240,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  button: {
    backgroundColor: colors.blue,
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

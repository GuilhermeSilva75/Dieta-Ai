import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from "react-native";
import { colors } from "@/constants/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";

interface HeaderProps {
    step: string
    title: string
}

export default function Header({ step, title }: HeaderProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.text}>
                        {step} <Feather name="loader" size={24} color="black" />
                    </Text>
                </View>

                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        marginBottom: 14,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 34 : 34
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 34,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    row: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    text: {
        fontSize: 18
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.background
    }
})
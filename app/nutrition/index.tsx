import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { colors } from '@/constants/colors';
import { useDataStore } from '@/data';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Data } from '@/types/data';
import { Link, router } from 'expo-router';

interface ResponseData {
    data: Data
}

export default function Nutrition() {

    const user = useDataStore(state => state.user)

    const { error, isFetching, data } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try {
                if (!user) {
                    throw new Error("Filed load nutrition")
                }

                const response = await api.post<ResponseData>("/create", {
                    name: user.name,
                    age: user.age,
                    gender: user.gender,
                    height: user.height,
                    weight: user.weight,
                    objective: user.objective,
                    level: user.level
                })

                console.log(response.data.data);
                return response.data.data

            } catch (error) {
                console.log(error);
            }
        }
    })

    async function handleShare() {
        try {
            if (data && Object.keys(data).length === 0 ) return

            const supplemets = `${data?.suplementos.map(item => ` ${item}`)}`

            const foods = `${data?.refeicoes.map(item => `\n- Nome: ${item.nome}\n- Horário ${item.horario}\n- Alimentos: ${item.alimentos.map(alimento => ` ${alimento}`)}`)}`

            const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dicas de suplementos: ${supplemets}`

            await Share.share({
                message: message
            })


        } catch (error) {
            console.log(error);
        }
    }

    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Gerando Dieta</Text>
                <Text style={styles.loadingText}>Consultando IA...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Falha ao criar dieta!</Text>
                <Link href={"/step"}>
                    <Text style={styles.loadingText}>Tente novamente </Text>
                </Link>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha dieta</Text>

                    <TouchableOpacity style={styles.butttonShare} onPress={handleShare}>
                        <Text style={styles.butttonSharetText}>Compartilhar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.name}>Nome: {data.nome}</Text>
                        <Text style={styles.objective}>Foco: {data.objetivo}</Text>

                        <Text style={styles.label}>Refeições: </Text>
                        <ScrollView>
                            <View style={styles.foods}>
                                {data.refeicoes.map((refeicao) => (
                                    <View key={refeicao.nome} style={styles.food}>
                                        <View style={styles.foodHeader}>
                                            <Text style={styles.foodname}>{refeicao.nome}</Text>
                                            <Ionicons name="restaurant" size={16} color="black" />
                                        </View>

                                        <View style={styles.foodContent}>
                                            <Feather name="clock" size={14} color="black" />
                                            <Text>Horário: {refeicao.horario}</Text>
                                        </View>

                                        <Text style={styles.foodText}>Alimentos</Text>
                                        {refeicao.alimentos.map((alimento => (
                                            <Text key={alimento}>{alimento}</Text>
                                        )))}
                                    </View>
                                ))}
                            </View>


                            <View style={styles.supplements}>
                                <Text style={styles.foodname}>Dicas de suplementos</Text>
                                {data.suplementos.map((item) => (
                                    <Text key={item}>{item}</Text>
                                ))}
                            </View>

                            <TouchableOpacity style={styles.button} onPress={() => router.replace("/")}>
                                <Text style={styles.buttonText}>Gerar nova dieta</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    loading: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontSize: 18,
        color: colors.white,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerHeader: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 16
    },
    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    title: {
        fontSize: 28,
        color: colors.background,
        fontWeight: 'bold'
    },
    butttonShare: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4
    }, butttonSharetText: {
        color: colors.white,
        fontWeight: 'semibold'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white
    },
    objective: {
        fontSize: 16,
        marginBottom: 24,
        color: colors.white
    },
    label: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    foods: {
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 8,
        gap: 8
    },
    food: {
        backgroundColor: "rgba(208,208,208, 0.4)",
        padding: 8,
        borderRadius: 4
    },
    foodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    foodname: {
        fontWeight: 'bold',
        fontSize: 16
    },
    foodContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    foodText: {
        fontSize: 16,
        marginBottom: 4,
        marginTop: 14
    },
    supplements: {
        backgroundColor: colors.white,
        padding: 14,
        marginBottom: 14,
        marginTop: 14,
        borderRadius: 8
    },
    button: {
        backgroundColor: colors.blue,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginBottom: 24
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
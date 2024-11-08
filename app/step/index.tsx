import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "@/constants/colors";
import Header from "@/components/header";
import Input from "@/components/input";

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { router } from "expo-router";
import { useDataStore } from "@/data";

const schema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatório' }),
    weight: z.string().min(1, { message: 'O peso é obrigatório' }),
    age: z.string().min(1, { message: 'A idade é obrigatória' }),
    height: z.string().min(1, { message: 'A altura é obrigatória' }),
})

type FormData = z.infer<typeof schema>

export default function Step() {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageOne = useDataStore(state => state.setPageOne)

    function handleCreate(data: FormData) {
        console.log("PASSANDO DADOS");
        setPageOne({
            name: data.name,
            height: data.height,
            weight: data.weight,
            age: data.age
        })

        router.push("/create")
    }


    return (
        <View style={styles.container}>
            <Header
                step="Passo 1"
                title="Vamos Começar"
            />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Input
                    name="name"
                    control={control}
                    placeholder="Digite seu nome"
                    error={errors.name?.message}
                    keyboadType="default"
                />

                <Text style={styles.label}>Seu peso atual:</Text>
                <Input
                    name="weight"
                    control={control}
                    placeholder="EX: 72"
                    error={errors.weight?.message}
                    keyboadType="numeric"
                />

                <Text style={styles.label}>Sua altura atual:</Text>
                <Input
                    name="height"
                    control={control}
                    placeholder="EX: 1,80"
                    error={errors.height?.message}
                    keyboadType="numeric"
                />

                <Text style={styles.label}>Sua idade atual:</Text>
                <Input
                    name="age"
                    control={control}
                    placeholder="EX: 22"
                    error={errors.age?.message}
                    keyboadType="numeric"
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        paddingHorizontal: 16
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8
    },
    button: {
        backgroundColor: colors.blue,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
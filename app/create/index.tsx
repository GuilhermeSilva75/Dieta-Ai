import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "@/constants/colors";
import Header from "@/components/header";

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Select from "@/components/input/select";
import { router } from "expo-router";
import { useDataStore } from "@/data";


const schema = z.object({
  gender: z.string().min(1, { message: 'O sexo é obrigatório' }),
  level: z.string().min(1, { message: 'O nivel é obrigatório' }),
  objective: z.string().min(1, { message: 'O objetivo é obrigatória' }),
})

type FormData = z.infer<typeof schema>

export default function Create() {

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setPageTwo = useDataStore(state => state.setPageTwo)

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ]

  const levelOptions = [
    { label: "Sedentário (pouco ou nemhuma atividade fisíca)", value: "sedenário" },
    { label: "Levemente ativo(exercícios 1 a 3 na semana)", value: "Levemente ativo(exercícios 1 a 3 na semana)" },
    { label: "Moderamente ativo(exercícios 3 a 5 na semana)", value: "Moderamente ativo(exercícios 3 a 5 na semana)" },
    { label: "Altamente ativo(exercícios 5 a 7 na semana)", value: "Altamente ativo(exercícios 5 a 7 na semana)" }
  ]

  const objectiveOptions = [
    { label: "Emagrecer", value: "emagrecer" },
    { label: "Hipertrofia", value: "hipertrofia" },
    { label: "Hipertrofia + Definição", value: "Hipertrofia e Definição" },
    { label: "Definição", value: "Definição" },
  ]


  function handleCreate(data: FormData) {
    setPageTwo({
      gender: data.gender,
      level: data.level,
      objective: data.objective
    })

    router.push("/nutrition")
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta" />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo</Text>
        <Select
          control={control}
          name="gender"
          error={errors.gender?.message}
          placeholder="Selecione o seu sexo"
          options={genderOptions}
        />

        <Text style={styles.label}>Selecione o nivel de ativiadade física:</Text>
        <Select
          control={control}
          name="level"
          error={errors.level?.message}
          placeholder="Selecione o nivel de ativiadade física"
          options={levelOptions}
        />

        <Text style={styles.label}>Selecione seu objetivo:</Text>
        <Select
          control={control}
          name="objective"
          error={errors.objective?.message}
          placeholder="Selecione seu objetivo"
          options={objectiveOptions}
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 16
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
interface RefeicoesProps{
    horario: string
    nome: string
    alimentos: string[]
}

export interface Data{
    nome: string
    sexo: string
    idade: string
    altura: number
    peso: number
    objetivo: number
    refeicoes: RefeicoesProps[]
    suplementos: string[]
}
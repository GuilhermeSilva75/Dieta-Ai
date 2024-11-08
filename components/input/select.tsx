import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Controller } from 'react-hook-form'
import { colors } from '@/constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

interface OptionsProps {
    label: string
    value: string | number
}


interface SelectProps {
    name: string
    control: any,
    placeholder?: string
    error?: string
    options: OptionsProps[]

}

export default function Select({ name, control, error, placeholder, options }: SelectProps) {

    const [visible, setVisible] = useState(false)

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
                            <Text>
                                {value ? options.find(options => options.value === value)?.label : placeholder}
                            </Text>

                            <AntDesign name="arrowdown" size={24} color="black" />
                        </TouchableOpacity>

                        <Modal visible={visible} animationType='fade' transparent={true} onRequestClose={() => setVisible(false)}>
                            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setVisible(false)}>

                                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                                    <FlatList
                                        data={options}
                                        contentContainerStyle={{ gap: 4 }}
                                        keyExtractor={(item) => item.value.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.options}
                                                onPress={() => {
                                                    onChange(item.value)
                                                    setVisible(false)
                                                }}
                                            >
                                                <Text>{item.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    </>
                )}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    input: {
        height: 45,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    errorText: {
        color: 'red',
        marginTop: 4
    },
    select: {
        flexDirection: 'row',
        height: 45,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 4
    },
    modalContainer: {
        backgroundColor: "rgba(0,0,0, 0.5)",
        flex: 1,
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: colors.white,
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 8
    },
    options: {
        paddingVertical: 14,
        backgroundColor: "rgba(208,208,208, 0.40)",
        borderRadius: 4,
        paddingHorizontal: 8
    }
})
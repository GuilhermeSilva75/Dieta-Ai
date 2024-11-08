import { View, Text, StyleSheet, TextInput, KeyboardTypeOptions } from 'react-native';
import { Controller } from 'react-hook-form'
import { colors } from '@/constants/colors';


interface InputProps {
    name: string
    control: any,
    placeholder?: string
    rules?: object
    error?: string
    keyboadType: KeyboardTypeOptions
}

export default function Input({ name, control, keyboadType, error, placeholder, rules }: InputProps) {
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                rules={rules}

                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        keyboardType={keyboadType}
                    />
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
    errorText:{
        color: 'red',
        marginTop: 4
    }
})
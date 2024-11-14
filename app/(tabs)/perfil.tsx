import React, { useState } from 'react';
import perfilScreenStyles from '../styles/perfilStyles';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';


const PerfilScreen = () => {
    const [inputText1, setInputText1] = useState('');
    const [inputText2, setInputText2] = useState('');
    const [inputText3, setInputText3] = useState('');
    const [inputText4, setInputText4] = useState('');
    return (
        <View style={perfilScreenStyles.container}>

            <Image
                source={require('../../assets/images/user.png')}
                style={perfilScreenStyles.profileImage} />
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Nombre:</Text>
                <TextInput
                    onChangeText={setInputText1}
                    placeholder="Juan"
                    style={perfilScreenStyles.value}
                    value={inputText1} />
            </View>
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Apellido:</Text>
                <TextInput
                    onChangeText={setInputText2}
                    placeholder="Pérez"
                    style={perfilScreenStyles.value}
                    value={inputText2} />
            </View>
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Edad:</Text>
                <TextInput
                    onChangeText={setInputText3}
                    placeholder="30"
                    style={perfilScreenStyles.value}
                    value={inputText3} />
            </View>
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Email:</Text>
                <TextInput
                    onChangeText={setInputText4}
                    placeholder="juan.perez@email.com"
                    style={perfilScreenStyles.value}
                    value={inputText4} />
            </View>
        </View>
    );
};

export default PerfilScreen;

import React, { useState } from 'react';
import perfilScreenStyles from '../../styles/perfilStyles';
import themeDark from '../../themes/themeDark';
import themeLight from '../../themes/themeLight';
import { Image, Text, TextInput, View, useColorScheme } from 'react-native';

const PerfilScreen = () => {
    const [inputText1, setInputText1] = useState('');
    const [inputText2, setInputText2] = useState('');
    const [inputText3, setInputText3] = useState('');
    const [inputText4, setInputText4] = useState('');
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <View style={[perfilScreenStyles.container, isDarkMode ? themeDark.darkBackground : themeLight.lightBackground]}>
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

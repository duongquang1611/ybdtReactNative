import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Feather, AntDesign } from "@expo/vector-icons";
import validator from 'validator'
export default class InputField extends Component {

    state = {
        validColor: '#F4F4F4',
        showNotify: false,
        hideText: true,
        showCheck: false,
        showCorrect: false
    }

    render() {
        return (
            <View style={styles.fieldInput}>
                    <Text style={styles.textHeader}>
                        {this.props.textHeader}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 2,
                        borderBottomColor: this.state.validColor}}
                    >
                        <TextInput
                            onChangeText={(inputText) => {
                                this.setState({validColor : this.props.checkValid(inputText)?'#17B890':'red', showNotify: !this.props.checkValid(inputText),showCheck: true, showCorrect: this.props.checkValid(inputText)})
                            }}
                            style={{ ...styles.editInput, marginTop: 0, flex: 10 }}
                            secureTextEntry={this.state.hideText}>
                        </TextInput>
                        {
                            this.state.showCheck
                            ?
                            {
                                ...this.state.showCorrect
                                ?
                                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => this.setState({hideText: !this.state.hideText})}>
                                    <AntDesign name={'checkcircle'} color='#17B890' style={{textAlign: 'right', fontSize: 14}}/>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => this.setState({hideText: !this.state.hideText})}>
                                    <AntDesign name={'closecircle'} color='red' style={{textAlign: 'right', fontSize: 14}}/>
                                </TouchableOpacity>
                            }
                            :
                            null
                        }
                        
                        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => this.setState({hideText: !this.state.hideText})}>
                            <Feather name={this.state.hideText ? 'eye' : 'eye-off'} color='#a89e9e' style={{textAlign: 'right', fontSize: 17}}/>
                        </TouchableOpacity>
                    </View>
                    {this.state.showNotify ? <Text style={{fontSize: 11, color:'red', marginTop: 5}}>{this.props.textNotify}</Text> : null}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    fieldInput: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginLeft: 25,
        marginRight: 25,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: "white"
    },
    textHeader: {
        textTransform: "capitalize",
        fontSize: 14,
        color: "#CBBEB3"
    },
    editInput: {
        fontSize: 16
    },
})

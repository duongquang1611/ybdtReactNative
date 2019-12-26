import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import axios from 'axios'
import {Env} from '../../../environment'
import validator from 'validator'
import InputField from './input-field/InputField'
export default class ChangePassword extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        userId: '',
        oldPasswordField: false,
        newPasswordField: false,
        confirmNewPasswordField: false
    }

    changePassword() {
        axios.post(`${Env.appUrl}/accounts/ChangePassword?userId=${this.state.userId}`, {
            OldPassword: this.state.oldPassword,
            NewPassword: this.state.newPassword,
            ConfirmPassword: this.state.confirmNewPassword
        })
        .then((res) => {
            this.props.navigation.navigate('Profile');
            Alert.alert(
                'Thành Công',
                'Thay đổi mật khẩu thành công',
                [
                  {
                    text: 'Xác nhận',
                    style: 'confirm',
                  }
                ],
              );
        })
        .catch((err) => {
            Alert.alert(
                'Thất bại',
                'Mật khẩu hiện tại không đúng',
                [
                  {
                    text: 'Xác nhận',
                    style: 'cancel',
                  }
                ],
              );
        })
    }

    async componentDidMount(){
        let token = await AsyncStorage.getItem('token')
        this.setState({userId: JSON.parse(token).id})
    }
    
    checkValidOldPassword = (inputText) => {
        this.setState({oldPassword: inputText, oldPasswordField: inputText.length>=4 & inputText.length<=16 & validator.isAlphanumeric(inputText)})
        return inputText.length>=4 & inputText.length<=16 & validator.isAlphanumeric(inputText)
    }
    checkValidNewPassword = (inputText) => {
        this.setState({newPassword: inputText, newPasswordField: inputText.length>=4 & inputText.length<=16 & validator.isAlphanumeric(inputText)})
        return inputText.length>=4 & inputText.length<=16 & validator.isAlphanumeric(inputText)
    }
    checkValidConfirmNewPassword = (inputText) => {
        this.setState({confirmNewPassword: inputText, confirmNewPasswordField: validator.equals(inputText, this.state.newPassword)})
        return validator.equals(inputText, this.state.newPassword)
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled keyboardVerticalOffset={-110}>
                <View>
                    <Text style={{marginHorizontal: 25, textTransform: "capitalize", color: "#17B890", fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Thay đổi mật khẩu</Text>
                    
                    <InputField checkValid={this.checkValidOldPassword} textHeader={'Mật khẩu hiện tại'} textNotify={'* Mật khẩu dài 4-16 kí tự, chỉ chứa các kí tự chữ và số'}></InputField>
                    <InputField checkValid={this.checkValidNewPassword} textHeader={'Mật khẩu mới'} textNotify={'* Mật khẩu dài 4-16 kí tự, chỉ chứa các kí tự chữ và số'}></InputField>
                    <InputField checkValid={this.checkValidConfirmNewPassword} textHeader={'Xác thực mật khẩu mới'} textNotify={'* Xác thực mật khẩu mới không chính xác'}></InputField>

                    {
                        this.state.oldPasswordField&this.state.newPasswordField&this.state.confirmNewPasswordField
                        ?
                        <TouchableOpacity style={{marginTop: 15}} onPress={() => {
                            Keyboard.dismiss()
                            this.changePassword()
                            }}>
                            <Text style={[styles.confirmButton, {backgroundColor: "#17B890",}]}>Xác nhận thay đổi</Text>
                        </TouchableOpacity>
                        :
                        <Text style={[styles.confirmButton, {backgroundColor: "grey", marginTop: 15}]}>Xác nhận thay đổi</Text>
                    }
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        backgroundColor: '#F4F4F4',
        flex: 1,
        paddingTop: 40
    },
    borderTextInput: {
        borderBottomWidth: 2,
        borderBottomColor: 'grey'
    },
    confirmButton: {
        marginHorizontal: 25,
        textAlign:'center',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderRadius: 5,
        paddingVertical: 10
    }
})

import React, {Component} from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import {w, h, totalSize} from '../Dimensions';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';


class InputField extends Component {

    state = {
        text: ''
      };
    
    getInputValue = () => this.state.text;
    
    render() {
        return (
          <View style={[styles.container, this.props.style, this.props.error ? styles.containerError : {}]}>
            <FontAwesome style={styles.icon } name={this.props.iconName} size={25} color='white' />
            <TextInput
              style={styles.inputText}
              value={this.state.text}
              selectionColor="white"
              autoCapitalize={this.props.autoCapitalize}
              ref={ref => this.input = ref}
              secureTextEntry={this.props.secureTextEntry}
              blurOnSubmit={this.props.blurOnSubmit}
              keyboardType={this.props.keyboardType}
              returnKeyType={this.props.returnKeyType}
              placeholder={this.props.placeholder}
              onSubmitEditing={this.props.focus(this.props.placeholder)}
              placeholderTextColor="lightgray"
              onChangeText={(text) => this.setState({ text })}
            />
            {this.props.error && <MaterialIcons style={styles.iconError} name="error" color="white" size={25}/>}
          </View>
        );
      }
    }
    
    InputField.defaultProps = {
      focus: () => {},
      style: {},
      placeholder: '',
      blurOnSubmit: false,
      returnKeyType: 'next',
      error: false,
      keyboardType: null,
      secureTextEntry: false,
      autoCapitalize: "none",
    };
    

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        paddingVertical: w(3.4),
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        borderWidth: 1,
        width: '85%'
    },
    containerError: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderBottomColor: 'red',
      },
      inputText: {
        color: 'white',
        flex: 1,  
        fontSize: totalSize(2.1),
        marginLeft: w(3)
      },
      icon: {
        marginLeft: w(2) 
      },
      iconError: {  
        marginRight: w(3)
      },
    
});

export default InputField;
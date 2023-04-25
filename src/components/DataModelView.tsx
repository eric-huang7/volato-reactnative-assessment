/**
 * DataModelView to render selected DataModel
 */

import React, {useEffect, useState} from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import RippleButton from "./RippleButton";
import CryptoJS from "crypto-js";

interface Props {
    dataModel: DataModel;
}

interface FieldValue {
    [key: string]:string;
}

interface OutputProps {
    label: string;
    value: string;
}

// global context
// this will pass to eval function as parameter
const ctx = {
    CryptoJS: CryptoJS
}

const DataModelView: React.FC<Props> = ({dataModel}) => {

    const [fieldValues, setFieldValues] = useState<FieldValue>({});

    const OutputView: React.FC<OutputProps> = ({label, value}) => {
        return (
            <View style={styles.outputField}>
                <Text style={styles.outputTitle}>{`${label}:`}</Text>
                <Text style={styles.outputValue}>{value}</Text>
            </View>
        );
    }

    /**
     * Calculate datamodel fields
     * @param newFieldValue - field values
     * @param evalStr - calculation
     * @returns calculated value
     */
    const calculate = async (newFieldValue: FieldValue, evalStr: string) => {
        try{
            let expression = evalStr;
            let keys = Object.keys(newFieldValue);

            // sort field keys to avoid replacing tweaks
            keys.sort((a, b)=>b.length - a.length)

            // replace input keys in calculate expression
            keys.forEach((key) => {
                const inputType = dataModel.fields[key].type;
                let value = newFieldValue[key];
                value = inputType === 'number' ? (value || '0') : (inputType === 'string') ? ('\"' + value + '\"') : value;
                expression = expression.replace(new RegExp(key, 'g'), value || '0');
            })

            // evaluate expression from string
            const evalRet = eval(expression);

            return typeof(evalRet) === 'function' ? evalRet(ctx) : evalRet;
        }catch(err){
            // error handling
            console.log(err);
        }
        return '';
    }

    
    const evaluateCalculation = async (newFieldValue: FieldValue) => {
        Object.keys(dataModel.fields).forEach(async key=>{
            if(dataModel.fields[key].calculate) {
                newFieldValue[key] = await calculate(newFieldValue, dataModel.fields[key].calculate || '');
            }
        });

        return newFieldValue;
    }

    const onChangeText = async (key: string, text: string) => {
        let newValue = {...fieldValues, [key]: text};
        setFieldValues(newValue);
    }

    const onPressCalc = () => {
        evaluateCalculation({...fieldValues}).then((values)=>{
            setFieldValues(values);
        }).catch(err =>{
            console.log("Error occured:", err)
        });
    }

    useEffect(()=>{
        const fields: FieldValue = {};
        Object.keys(dataModel.fields).forEach(
            key=>{
                fields[key] =  ""
            }
        )
        setFieldValues(fields);

    }, [dataModel]);

    useEffect(()=>{

    }, [fieldValues]);

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Text style={styles.modelTitle}>{`Data Model: ${dataModel.name}`}</Text>
                {Object.keys(dataModel.fields).map((key, index)=>(
                    <View style={styles.inputBlock} key={index}>
                        {
                            dataModel.fields[key].readOnly ? (
                                <OutputView label={dataModel.fields[key].label} value={fieldValues[key]} />
                            ):(
                                <TextInput
                                    placeholder={`${dataModel.fields[key].label}:`}
                                    style={styles.inputField}
                                    value={fieldValues[key]}
                                    returnKeyType="done"
                                    keyboardType={dataModel.fields[key].type === 'number' ? 'numeric' : 'default'}
                                    onChangeText={(text)=>onChangeText(key, text)}
                                />
                            )
                        }
                    </View>
                ))}
                <RippleButton
                    style={styles.btn}
                    onPress={onPressCalc}
                >
                    <Text style={styles.btnText}>Calculate</Text>
                </RippleButton>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        marginBottom: 32,
    },
    modelTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    inputBlock: {
        marginTop: 16,
    },
    inputField: {
        backgroundColor: '#ccc',
        fontSize: 14,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    btn: {
        borderRadius: 8,
        paddingVertical: 16,
        justifyContent: 'center',
        backgroundColor: '#6EE3B9'
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    },
    outputField: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    outputTitle: {

    },
    outputValue: {

    }

  });
  
export default DataModelView;
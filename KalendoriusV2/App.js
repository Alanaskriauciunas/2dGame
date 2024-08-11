import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomButton } from "./components/CustomButton";
import {LocaleConfig} from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegistrationScreen from "./screen/RegistrationScreen";
import LoginScreen from "./screen/LoginScreen";

const Stack = createNativeStackNavigator();

// npx expo install @react-native-async-storage/async-storage

    function CustomConfig(){
    LocaleConfig.locales['lt'] = {
      monthNames: ['Sausis','Vasaris','Kovas','Balandis','Geguže','Birželis','Liepa','Rugpjūtis','Rugsėjis','Spalis','Lapkritis','Gruodis'],
      monthNamesShort: ['Saus','Vasar','Kov','Balan','Gegu','Birz','Liepa','Rūgpj','Rugs','Spal','Lapkr','Gruod'],
      dayNames: ['Pirmadienis','Antradienis','Trečiadienis','Ketvirtadienis','Penktadienis','Šeštadienis','Sekmadienis'],
      dayNamesShort: ['Pir.','Ant.','Tre.','Ket.','Pen.','Šeš.','Sek.'],
      today: 'Šiandien'
    };
    LocaleConfig.defaultLocale = 'lt';
  }

function DayEditor({ year, month, day, dateString, onClose }) {
    const [notes, setNotes] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [saved, setSaved] = React.useState();
    const [error, setError] = React.useState();

    const [titleerror, setTitleerror] = React.useState();
    const [title, setTitle] = React.useState();

    
    
    async function fetchTitle(){
        setTitle(await AsyncStorage.getItem(dateString+ '-title'));
    }
    async function fetchNotes() {
        setNotes(await AsyncStorage.getItem(dateString)); 
        setLoading();
    }

    async function updateNotes() {
        if(title)
            await AsyncStorage.setItem(dateString + '-title', title)
        else
            await AsyncStorage.removeItem(dateString + '-title')

        if (notes)
            await AsyncStorage.setItem(dateString, notes);
        else
            await AsyncStorage.removeItem(dateString);

        setSaved(true);
        setError();
        
    }

    React.useEffect(() => {
        fetchTitle();
        fetchNotes();
    }, [
        year,
        month,
        day
    ]);
        
    if (loading) return (
        <Text>Kraunama...</Text>
    );

    return (
        <View style ={{gap: 8}}>
            <Text style={{fontSize: 20}}>{year}.{month}.{day}</Text>

                {saved ? (
                    <Text>Note saved.</Text>
                ) : null}

                <Text style={{ opacity:0.3, fontSize: 12, position: 'absolute', zIndex: 1, bottom: '81%', right: '30%' }}>
                    {title ? title.length : 0}/20
                </Text>  
            
            <TextInput style = {styles.titleinput}
                maxLength={20}//validation user cant enter more than 30 characters
                placeholder= "Title"
                value= {title}
                onChangeText={text =>{
                    setTitle(text);
                    setSaved();
                }}    
                />

                {titleerror && (<Text style = {{color: 'red'}}>{titleerror}</Text>)} 

                <Text style={{ opacity:0.3, fontSize: 12, position: 'absolute', bottom: '64%', zIndex: 1, right: '5%' }}>
                     {notes ? notes.length : 0}/121
                </Text>
            
            <TextInput style = {styles.textinput}
                maxLength={121}//validation user can't enter more than nr121
                textAlignVertical="top"
                placeholder="Notes"
                multiline
                numberOfLines={5}
                value={notes}
                onChangeText={text => {
                    setNotes(text);
                    setSaved();
                }} />

                {error && (<Text style={{ color: 'red' }}>{error}</Text>)}

            <View style={{flexDirection: 'row', gap: 8, justifyContent:'center'}}>
                <CustomButton
                    title="Save"
                    onPress={() => {
                        updateNotes();
                    }} />

                <CustomButton
                    title="Close"
                    onPress={onClose} />
            </View>
        </View>
    )
}


function MainBody()
{
    const [selectedDate, setSelectedDate] = React.useState();
    const [markedDates, setMarkedDates] = React.useState({});

    async function fetchMarkedDates() {
        const keys = await AsyncStorage.getAllKeys();
        const result = {};

        for (let i = 0; i < keys.length; i++)
            result[keys[i]] = { selected: true };


        setMarkedDates(result);
        
    }
    React.useEffect(() =>  {
        CustomConfig();
    },[]);

    React.useEffect(() => {
        fetchMarkedDates();
    }, [selectedDate]);

    return (
        <View style={styles.container}>
            {selectedDate ? ( 
                <DayEditor 
                    year={selectedDate.year} 
                    month={selectedDate.month}
                    day={selectedDate.day}
                    dateString={selectedDate.dateString}
                    onClose={() => setSelectedDate()} />
            ) : (
                <Calendar
                    theme={{
                        calendarBackground: '#BAB86C',
                        textSectionTitleColor: 'black'
                    }}
                    onDayPress={date => setSelectedDate(date)}
                    markedDates={markedDates} />
            )}
        </View>
    );
}


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegistrationScreen} />
                <Stack.Screen name="Main" component={MainBody} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#BAB86C",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 64
    },
    textinput: {
        paddingTop: 20,
        minHeight:150,
        borderWidth:1,
        width: 200,
        backgroundColor:'white',
        paddingLeft: 5,
        borderRadius: 15
    },
    titleinput: {
        borderWidth:1,
        height: 40,
        maxHeight: 40,
        backgroundColor: 'white',
        paddingLeft: 5,
        maxWidth: 150,
        borderRadius: 15
    }
});
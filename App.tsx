/**
 * Code Challange for Dynamic Data Model
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

// data model 1 for sha256 generation of 2 input strings
import data_model1 from './src/models/data_model1.json';
// data model 2 for Mean, Median, Standard Deviation of 10 input values
import data_model2 from './src/models/data_model2.json';
import DataModelView from './src/components/DataModelView';

// Global defintion of data models
// add other data types later
const data_models: DataModel[] = [data_model1, data_model2];

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedModel, setSelectedModel] = useState<DataModel | null>(null);
  const [dropdownValue, setDropdownValue] = useState<string | undefined>(undefined);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  useEffect(()=>{
    if(dropdownValue) {
      // change selected models on dropdown picker selection
      setSelectedModel(data_models.find(model=>model.name === dropdownValue) || null)
    }
  }, [dropdownValue]);

  // dropdown items list initialization from data models
  const dropdownItems: DropdownOption[] = data_models.map(model => {
    return {
      label: model.name,
      value: model.name,
      containerStyle: {
        backgroundColor: 'white'
      }
    }
  });
  

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        <View style={styles.container}>
          <Text style={styles.headingTitle}>Code Challenge</Text>
          {/** Dropdown picker for model */}
          <DropDownPicker
            open={dropdownOpen}
            setOpen={setDropdownOpen}
            items={dropdownItems}
            value={dropdownValue || ""}
            containerStyle={styles.dropdown}
            placeholder='Select an Data Model'
            onSelectItem={item=>setDropdownValue(item.value)}
            setValue={setDropdownValue}
            multiple={false}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedModel && (<DataModelView dataModel={selectedModel} />)}
          </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  headingTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',

  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  dropdown: {
    marginTop: 24,
  }
});

export default App;

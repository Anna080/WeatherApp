import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { debounce } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextInputWithIcon = ({ icon, ...props }) => (
  <View style={styles.inputContainer}>
    <Icon name={icon} size={13} color="gray" style={styles.icon} />
    <TextInput style={styles.input} {...props} />
  </View>
);

const Search = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  const search = debounce(async () => {
    try {
      const response = await axios.get('http://localhost:9200/pa_elasticsearch_weather_cities/_search', {
        params: {
          q: `nom:${query}`,
        },
      });

      const hits = response.data.hits.hits;
      setResults(hits.map(hit => hit._source));
    } catch (error) {
      console.error(error);
    }
  }, 300);

  useEffect(() => {
    if (query) {
      search();
    } else {
      setResults([]);
    }
    return () => {
      search.cancel();
    };
  }, [query]);

  const handleCitySelect = (city) => {
    setQuery(`${city.nom}, ${city.pays}`);
    setShowOverlay(false);
    onSelect(city);
  };

  const handleSubmitEditing = () => {
    const matchedCity = results.find(city => `${city.nom}, ${city.pays}` === query);
    if (matchedCity) {
      handleCitySelect(matchedCity);
    }
  };

  return (
    <SafeAreaView>

      <TextInputWithIcon icon="search" placeholder="Search for a city" value={query}
        onChangeText={text => {
          setQuery(text);
          setShowOverlay(true); // Show the overlay as soon as user types something
        }} 
        onSubmitEditing={handleSubmitEditing}
        onBlur={() => setShowOverlay(false)} // Hide the overlay when input loses focus
        />
      
      {showOverlay && (
        <View style={styles.overlayContainer}>
          {showOverlay && (
            <ScrollView style={styles.overlayContainer}>
              {results.map((item, index) => (
                <Text key={index} onPress={() => handleCitySelect(item)}>{item.nom}, {item.pays}</Text>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    marginLeft: -5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconStyle: {
    opacity: 10,
  },
});

export default Search;

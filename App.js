import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
} from "react-native";

import CoinItem from "./Components/CoinItem";

const App = () => {
  // useState para las coins
  const [coins, setCoins] = useState([]);
  //useState para el refresh de pantalla
  const [refreshing, setRefreshing] = useState(false);
  //useState para la busqueda
  const [search, setSearch] = useState("");

  // API

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    // Enviando informacion a array del useState para las coins
    setCoins(data);
  };

  // Ejecutando la llamada a la api cuando carga la app
  useEffect(() => {
    loadData();
  }, []);

  // renderizado de la api
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />

      <View style={styles.header}>
        <Text style={styles.title}>CryptoMarket</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a Coin"
          placeholderTextColor="#858585"
          onChangeText={(text) => text && setSearch(text)}
        />
      </View>

      {/* Recibiendo el array con flatList y recorriendolo */}
      <FlatList
        style={styles.list}
        data={coins.filter(
          (coin) =>
            // especificaciones para la busqueda
            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        showsVerticalScrollIndicator={false}
        // recorrer cada item de cada uno de los objetos de la api
        renderItem={({ item }) => <CoinItem coin={item} />}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});

export default App;
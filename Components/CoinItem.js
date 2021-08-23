import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

// Extraemos de las props la informacion que nos da item en App.js
const CoinItem = ({ coin }) => {
    return (
        <View style={style.containerItem}>
            <View style={style.coinName}>
                <Image style={style.image}
                    source={{ uri: coin.image }}
                />
                <View style={style.containerName}>
                    <Text style={style.text}>{coin.name}</Text>
                    <Text style={style.textSymbol}>{coin.symbol}</Text>
                </View>
            </View>
            <View>
                <Text style={style.textPrice}>{coin.current_price} US$</Text>
                {/* Condicion para aplicar un estilo u otro */}
                <Text style={[style.pricePercentage,
                coin.price_change_percentage_24h > 0 ?
                    style.priceUp : style.priceDown]}>
                    {coin.price_change_percentage_24h}</Text>
            </View>
        </View>
    )
}


// Estilos

const style = StyleSheet.create({
    containerItem: {
        backgroundColor: '#121212',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: '#ffffff',
    },
    coinName: {
        flexDirection: 'row',
    },
    image: {
        width: 30,
        height: 30
    },
    textSymbol: {
        color: '#434343',
        textTransform: 'uppercase',

    },
    containerName: {
        marginLeft: 10
    },
    pricePercentage: {
        textAlign: 'right'
    },
    priceUp: {
        color: 'green'
    },
    priceDown: {
        color: 'red'
    },
    textPrice: {
        textAlign: 'right',
        color: '#ffffff',
    }

})

export default CoinItem

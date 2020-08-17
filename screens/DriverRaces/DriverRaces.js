import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Linking } from 'react-native'
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Loader from '../../components/Loader'
import { connect } from 'react-redux'

import styles from './styles'

function mapStateToProps(state) {
  return {
    driverData: state.driverData
  }
}

function DriverRaces(props) {

  const driver = props.driverData[0]
  const [initialLoading, setInitialLoading] = useState(true)
  const [data, setData] = useState(null)
  const [offset, setOffset] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const limit = 5

  useEffect(() => {
    props.navigation.setOptions({
      title: driver.driverId + ' races',
    })
    fetch_data()

    return () => {}
  }, [])

  const fetch_data = async (newData) => {
    setInitialLoading(true)
    await axios.get(`http://ergast.com/api/f1/drivers/${driver.driverId}/circuits.json?limit=${limit}&offset=${newData}`)
    .then((response) => {
      setData(response.data.MRData.CircuitTable.Circuits)
      setInitialLoading(false)
    }).catch(error => {
      Alert.alert(error)
    })
  }

  const handleNextPagePress = (newData) => {
    setOffset(newData)
    fetch_data(newData)
    setPageNum(pageNum + 1)
  }

  const handlePrevPagePress = (newData) => {
    if (newData >= 0) {
      setOffset(newData)
      fetch_data(newData)
      setPageNum(pageNum - 1)
    }
  }

  const renderRow = (item) => {
    return (
      <>
      { data && data.map((circuit, key) => {
        return (
          <View key={key} style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text>{JSON.stringify(circuit[item]).split('"')[1]} </Text>
          </View>
        )
      })}
      </>
    )
  }

  if (initialLoading) {
    return <Loader/>
  }

  return (
    <View>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column'}}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={{fontWeight: 'bold'}}>circuitId</Text>
            </View>
            { renderRow("circuitId") }
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column' }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={{fontWeight: 'bold'}}>circuitName</Text>
            </View>
            { renderRow("circuitName") }
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column' }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={{fontWeight: 'bold'}}>Url</Text>
            </View>
            { data && data.map((circuit, key) => {
              return (
                  <View key={key} style={{ flex: 1, alignSelf: 'stretch' }}>
                    <TouchableOpacity onPress={() => Linking.openURL(JSON.stringify(circuit.url).split('"')[1])} >
                      <Text style={{color: 'blue'}}>Link</Text>
                    </TouchableOpacity>
                  </View>
              )
            })}
          </View>
        </View>

      </ScrollView>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => handlePrevPagePress(offset - limit)}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text> { pageNum } </Text>
        <TouchableOpacity onPress={() => handleNextPagePress(offset + limit)}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default connect(mapStateToProps)(DriverRaces)

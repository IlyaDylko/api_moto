import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
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

function mapDispatchToProps(dispatch) {
  return {
      setDriverData: async (newData, limit) => {
        try {
          const { data } = await axios.get(`http://ergast.com/api/f1/drivers.json?limit=${limit}&offset=${newData}`)
          dispatch({ type: 'SET_DRIVER_DATA', payload: data.MRData.DriverTable.Drivers})
        } catch (e) {
          Alert.alert(e)
        }
      }
  }
}

function Main(props) {

  const [offset, setOffset] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const limit = 5
  const data = props.driverData

  useEffect(() => {
    fetch_data(0)
    return () => {
    }
  }, [])

  const fetch_data = (newData) => {
    props.setDriverData(newData, limit)
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

  const renderDrivers = () => {
    return (
      <>
      { data && data.map((driver, key) => {
        return (
          <TouchableOpacity key={key} containerStyle={{ flex: 1, alignSelf: 'stretch' }} onPress={() => props.navigation.navigate('DriverProfile')}>
            <Text>{JSON.stringify(driver.driverId).split('"')[1]} </Text>
          </TouchableOpacity>
        )
      })}
      </>
    )
  }

  const renderRaces = () => {
    return (
      <>
      { data && data.map((driver, key) => {
        return (
          <TouchableOpacity key={key} containerStyle={{ flex: 1, alignSelf: 'stretch' }} onPress={() => props.navigation.navigate('DriverRaces', {driver})}>
            <Text>Races</Text>
          </TouchableOpacity>
        )
      })}
      </>
    )
  }

  return (
    <View>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'row' }}>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column'}}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={{fontWeight: 'bold'}}>driverId</Text>
            </View>
            { renderDrivers() }
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column'}}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={{fontWeight: 'bold'}}>History</Text>
            </View>
            { renderRaces() }
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)

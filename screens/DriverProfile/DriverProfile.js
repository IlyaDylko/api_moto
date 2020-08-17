import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    driverData: state.driverData
  }
}

function DriverProfile(props) {

  const driver = props.driverData[0]

  useEffect(() => {
    props.navigation.setOptions({
      title: driver.driverId,
    })

    return () => {}
  }, [])

  return (
    <View>
      <Text>Id: {JSON.stringify(driver.driverId).split('"')[1]}</Text>
      <Text>Given Name: {JSON.stringify(driver.givenName).split('"')[1]}</Text>
      <Text>Family Name: {JSON.stringify(driver.familyName).split('"')[1]}</Text>
      <Text>Nationality: {JSON.stringify(driver.nationality).split('"')[1]}</Text>
      <Text>Date of Birth: {JSON.stringify(driver.dateOfBirth).split('"')[1]}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>Url:</Text>
        <TouchableOpacity onPress={() => Linking.openURL(JSON.stringify(driver.url).split('"')[1])} >
          <Text style={{color: 'blue'}}>Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default connect(mapStateToProps)(DriverProfile)

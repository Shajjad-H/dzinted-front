import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignUpFormPage = () => {
  return (
    <View>
      <Text>SignUpForm</Text>
      <Link href={"/App"}>Page principale</Link>
    </View>
  )
}

export default SignUpFormPage
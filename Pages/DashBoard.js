import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import BarDashBoard from '../components/BarDashBoard'
import ProgressBar from '../components/ProgressBar'

export default function DashBoard() {
    return (
        <LinearGradient style={styles.container} colors={['#92C6BC', '#8D9A93', '#536976', '#273035', '#101011']}>
           <BarDashBoard />
           <ProgressBar />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }})

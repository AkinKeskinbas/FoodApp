import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import * as Font from 'expo-font';
import * as Animatable from 'react-native-animatable';
import { COLORS, SIZES } from "../assets/colors/splashColors"
import CustomButton from './CustomButton';

const zoomIn = {
    0: {
        opacity: 0,
        translateX: -5,
    },
    1: {
        opacity: 1,
        translateX: 1,

    },


};
const zoomIn2 = {
    0: {
        opacity: 0,
        translateY:-5,
    },
    1: {
        opacity: 1,
        translateY: 1,

    },


};
async function loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
    
      MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
      MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
      MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
      MontserratSemiBold:require('../assets/fonts/Montserrat-SemiBold.ttf'),
    
    
    
      
    });

}

function renderHeader() {
    return (
        <View style={styles.contentContainer}>
            <ImageBackground source={require("../assets/images/foodBg.jpg")} style={styles.bgImage}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={[COLORS.transparent, COLORS.black]}
                    style={{
                        height: 200,
                        justifyContent: "flex-end",
                        paddingHorizontal: SIZES.padding

                    }}
                >
                    <Animatable.Text
                     animation={zoomIn2}
                     duration={900}
                     delay={300}
                        style={{ width: "80%", color: COLORS.white,paddingBottom:35, fontSize: 40,fontFamily:"MontserratBold", lineHeight: 45 }}
                    >
                        Delicious Foods For Special People
                    </Animatable.Text>
                </LinearGradient>


            </ImageBackground>
        </View>
    )

}
function renderDetails(navigation) {
    return (
        <Animatable.View
            animation={zoomIn}
            duration={900}
            delay={600}
            style={{ flex: 1, paddingHorizontal: SIZES.padding }}>
            <Text style={{  marginBottom:55, color: COLORS.gray, width: "70%", fontSize: 13,fontFamily:"MontserratBold" }}>
                Discover delicious foods and order more than 100 food! All foods are prepared to your taste.
            </Text>
            <View
                style={{ flex: 1, justifyContent: "center" }}>

                <CustomButton
                    buttonText="Discover"
                    colors={[COLORS.darkGreen, COLORS.lime]}
                    buttonContainerStyle={{
                        paddingVertical: 18,
                        borderRadius: 20
                    }}
                    onPress={() => { navigation.replace("Home") }}

                />
                <CustomButton
                    buttonText="Quit"
                    colors={[]}
                    buttonContainerStyle={{
                        paddingVertical: 18,
                        borderRadius: 20,
                        marginTop: SIZES.radius,
                        borderColor: COLORS.darkLime,
                        borderWidth: 1
                    }}


                />
                <Text style={{ marginTop: SIZES.radius, marginBottom:35, color: COLORS.gray, width: "70%", fontSize: 13,fontFamily:"MontserratRegular", paddingVertical:SIZES.padding}}>-Created by Akın Keskinbaş.</Text>
            </View>
        </Animatable.View>
    )

}

export class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.state=({
            isFontLoad:false
        })


    }

  async  componentDidMount() {
        await loadFonts()
        this.setState({
            isFontLoad:true
        })
    }


    render() {
        if (!this.state.isFontLoad) {
            return(
                <View style={{flex:1}}>
                <ActivityIndicator style={{color:COLORS.black}}>

                </ActivityIndicator>
                </View>
            )
        }else{
            return (
                <View style={styles.mainContainer}>
                    {renderHeader()}
                    {renderDetails(this.props.navigation)}
                </View>
            )
        }
        
    }
}

export default SplashScreen
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.black,

    },
    contentContainer: {

        height: SIZES.height > 700 ? "65%" : "60%"
    },
    bgImage: {
        flex: 1,
        justifyContent: "flex-end",
        resizeMode: "cover"
    }

})
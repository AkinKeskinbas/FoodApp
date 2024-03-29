import { NavigationHelpersContext } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring,
  Easing,
} from 'react-native-reanimated';


export default Details = ({ route, navigation }) => {
  const { item } = route.params;
  const scale = useSharedValue(1)
  const marginV = useSharedValue(50)
  const marginR = useSharedValue(0)
  const progress =useSharedValue(1)
  const rotateV =useSharedValue("0deg")

  const reanimatedStyle = useAnimatedStyle(()=>{
    return{
    
      resizeMode: 'contain',
      marginLeft: marginV.value,
      marginRight: marginR.value,
      //opacity:progress.value,
      transform:[
        { scale:scale.value, },
        {rotateZ:rotateV.value},
        {translateX:progress.value}
        
        
       // {rotate:`${progress.value*2*Math.PI}rad`}
      ],
    }
  })
  function alertCikar() {
    alert("Order Received")
  }
  function scaleImage(callback) {
    //rotateV.value =withRepeat(withTiming("90deg"), 4, true)
    scale.value = withRepeat(withTiming(1.5), 4, true)
    callback()
    // scale.value=withSequence(
    //   withTiming(1.5, { duration: 500 }),
    //   //withRepeat(withTiming( withSpring(2)), 6, true),
    //   withTiming(1, { duration: 500 })
    // );
    
   // progress.value =withSpring(-50)
    
   
  }
  const renderIngredientsItem = ({ item }) => {
    return (
      <View
        style={[
          styles.ingredientItemWrapper,
          {
            marginLeft: item.id === '1' ? 20 : 0,
          },
        ]}>
        <Image source={item.image} style={styles.ingredientImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.headerLeft}>
              <Feather name="chevron-left" size={12} color={colors.textDark} />
            </View>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <MaterialCommunityIcons
              name="star"
              size={12}
              color={colors.white}
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Titles */}
      <View style={styles.titlesWrapper}>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      {/* Price */}
      <View style={styles.priceWrapper}>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>

      {/* Pizza info */}
      <View style={styles.infoWrapper}>
        <View style={styles.infoLeftWrapper}>
          <View style={styles.infoItemWrapper}>
            <Text style={styles.infoItemTitle}>Size</Text>
            <Text style={styles.infoItemText}>
              {item.sizeName} {item.sizeNumber}"
            </Text>
          </View>
          <View style={styles.infoItemWrapper}>
            <Text style={styles.infoItemTitle}>Crust</Text>
            <Text style={styles.infoItemText}>{item.crust}</Text>
          </View>
          <View style={styles.infoItemWrapper}>
            <Text style={styles.infoItemTitle}>Delivery in</Text>
            <Text style={styles.infoItemText}>{item.deliveryTime} min</Text>
          </View>
        </View>
        <View>
          <Animated.Image source={item.image} style={reanimatedStyle} />
        </View>
      </View>

      {/* Ingredients */}
      <View style={styles.ingredientsWrapper}>
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        <View style={styles.ingredientsListWrapper}>
          <FlatList
            data={item.ingredients}
            renderItem={renderIngredientsItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Place an order */}
      <TouchableOpacity onPress={() =>scaleImage(alertCikar)}>
        <View style={styles.orderWrapper}>
          <Text style={styles.orderText}>Place an order</Text>
          <Feather name="chevron-right" size={18} color={colors.black} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerLeft: {
    borderColor: colors.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  titlesWrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontFamily: 'MontserratBold',
    fontSize: 32,
    color: colors.textDark,
    width: '50%',
  },
  priceWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  priceText: {
    color: colors.price,
    fontFamily: 'MontserratBold',
    fontSize: 32,
  },
  infoWrapper: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLeftWrapper: {
    paddingLeft: 20,
  },
  infoItemWrapper: {
    marginBottom: 20,
  },
  infoItemTitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 14,
    color: colors.textLight,
  },
  infoItemText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    color: colors.textDark,
  },
  itemImage: {
    resizeMode: 'contain',
    marginLeft: 50,
  },
  ingredientsWrapper: {
    marginTop: 40,
  },
  ingredientsTitle: {
    paddingHorizontal: 20,
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: colors.textDark,
  },
  ingredientsListWrapper: {
    paddingVertical: 20,
  },
  ingredientItemWrapper: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 15,
    borderRadius: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  ingredientImage: {
    resizeMode: 'contain',
  },
  orderWrapper: {
    marginTop: 60,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontFamily: 'MontserratBold',
    fontSize: 14,
    marginRight: 10,
  },
});

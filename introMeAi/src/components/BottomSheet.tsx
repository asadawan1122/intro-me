import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'

import { ColorSet, ScreenSize } from '../styles'
import { Images } from '../constants/assets/images'
import appStyle from '../styles/appStyle';

import ActionSheet from 'react-native-actions-sheet'
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface BottomSheetProps {
  bottomSheetRef: React.Ref<ActionSheet> | undefined
  overlayOpacity?: number | undefined
  bottomCloseBtn?: Boolean | undefined
  closeOnTouchBackdrop?: Boolean | undefined
}

const BottomSheet: React.FC<BottomSheetProps> = props => {
  const { bottomSheetRef, overlayOpacity, bottomCloseBtn, closeOnTouchBackdrop } = props

  const onPressClose = () => {
    bottomSheetRef.current?.setModalVisible(false)
  }

  return (
    <ActionSheet
      bounceOnOpen={true}
      elevation={23}
      statusBarTranslucent={false}
      indicatorColor={ColorSet.grayMedium}
      closeOnPressBack={true}
      closeOnTouchBackdrop={closeOnTouchBackdrop == undefined ? false : true}
      openAnimationSpeed={10}
      
      overlayColor={ColorSet.grayMedium}
      defaultOverlayOpacity={
        overlayOpacity == undefined ? 0.94 : overlayOpacity
      }
      containerStyle={{
        // backgroundColor: 'rgba(0,0,0,0.0)',
        backgroundColor: ColorSet.grayMedium,
        width:
          bottomCloseBtn !== false
            ? ScreenSize.screenWidth.width100 - 40
            : ScreenSize.screenWidth.width100,
        zIndex: 9999,
        paddingBottom:20,
      }}
      ref={bottomSheetRef}>
      <View style={styles.contentContainer}>{props.children}</View>
      {bottomCloseBtn !== false && (
        <TouchableOpacity style={appStyle.asCenter} onPress={onPressClose}>
          <Image source={Images.roundClose} style={styles.closeIcon} />
        </TouchableOpacity>
      )}
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorSet.grayMedium,
  },
  contentContainer: {
    paddingBottom: 25,
    // paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: ColorSet.grayMedium,
  
    borderRadius: 16,
  },
  closeIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
})

export default BottomSheet

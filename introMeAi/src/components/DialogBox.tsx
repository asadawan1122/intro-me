import React, {useState} from 'react';
import {StyleSheet, View, Image, Platform, ViewStyle} from 'react-native';

import {H3, HeaderBackButton, Logo, Paragraph} from '../components';
import {Icons} from '../constants/assets/icons';
import {ColorSet} from '../styles';
import appStyle from '../styles/appStyle';
import {FamilySet} from '../styles/fontFamily';
import {animation} from '../utils/animations';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

interface props {
  isActive?: boolean | undefined;
  customStyle?: ViewStyle | undefined;
  onPress?: (() => void) | undefined;
  description?: string | undefined;
  title?: string | undefined;
}

const DialogBox: React.FC<props> = props => {
  const {isActive, onPress, customStyle, title, description} = props;
  const [defaultAnimationDialog, setDefaultAnimationDialog] =
    useState(isActive);
    console.log('defaultAnimationDialog',isActive);
    
  return (
    <View>
      <Dialog
        onDismiss={() => {
          setDefaultAnimationDialog(false);
        }}
        width={0.9}
        visible={defaultAnimationDialog}
        rounded
        actionsBordered
        dialogTitle={
          <DialogTitle
            title={title}
            style={{
              backgroundColor: '#F7F7F8',
            }}
            hasTitleBar={false}
            align="left"
          />
        }
        footer={
          <DialogFooter>
            <DialogButton
              text="CANCEL"
              bordered
              onPress={() => {
                setDefaultAnimationDialog(false);
              }}
              key="button-1"
            />
            <DialogButton text="OK" bordered onPress={onPress} key="button-2" />
          </DialogFooter>
        }>
        <DialogContent
          style={{
            backgroundColor: '#F7F7F8',
          }}>
          <Paragraph>{description}</Paragraph>
        </DialogContent>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    padding: 16,
  },
  buttonStyle: {
    minWidth: '100%',
    padding: 10,
    backgroundColor: '#f5821f',
    margin: 15,
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});

export default DialogBox;

import React, {useState, createRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import {Layout, Logo, Paragraph, Link, H3} from '../../components';
import Button from '../../components/Button';
import Header from '../../components/navbar/Header';
import {Icons} from '../../constants/assets/icons';
import {Images} from '../../constants/assets/images';
import {ColorSet} from '../../styles';
import appStyle from '../../styles/appStyle';
import {screenHeight} from '../../styles/screenSize';
import {
  H1,
  H3,
  H4,
  Layout,
  NameInput,
  BottomSheet,
  Paragraph,
  DialogBox,
  Checkbox,
} from '../../components';

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [name, setName] = useState<string>('John Doe');
  const [edit, setEdit] = useState<boolean>(false);
  const [userSelectedLanguage, setUserSelectedLanguage] = useState<string>('');

  let languages = ['English', 'German', 'French', 'Italian', 'Spanish'];
  const bottomSheetUserLanguage = createRef();

  const onPressLanguage = () => {
    console.log('pressed');

    // bottomSheetUserLanguage.current?.setModalVisible();
    bottomSheetUserLanguage.current?.setModalVisible();
  };

  const selectLanguage = (lang: string) => {
    // bottomSheetUserLanguage.current?.setModalVisible(false);
    setUserSelectedLanguage(lang);
  };

  return (
    <Layout>
      <Header title={'Settings'}></Header>

      <View>
        {edit ? (
          <View style={[appStyle.row, appStyle.mt20, appStyle.mb30]}>
            <NameInput value={name} setValue={setName} />
            <TouchableOpacity onPress={() => setEdit(false)}>
              <Image style={styles.editActive} source={Icons.editActive} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[appStyle.row, appStyle.mt20, appStyle.mb30]}>
            <H1 style={{maxWidth: '50%'}} numberOfLines={1}>
              {name}
            </H1>
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Image style={styles.editInActive} source={Icons.editInactive} />
            </TouchableOpacity>
          </View>
        )}

        <View>
          <H4 style={{color: ColorSet.link}}>User Language</H4>
          <Button
            containerStyle={appStyle.mt10}
            icon2={Icons.arrowDown}
            onPress={onPressLanguage}>
            English
          </Button>
        </View>

        <View style={[appStyle.mt30]}>
          <H4 style={{color: ColorSet.link}}>Practice Language</H4>
          <Button containerStyle={appStyle.mt10} icon2={Icons.arrowDown}>
            German
          </Button>
        </View>

        <View style={[{marginTop: screenHeight.height100 / 5}]}>
          <Button
            // onPress={() => setIsDialogShow(true)}
            containerStyle={appStyle.mt10}
            icon={Icons.appleB}
            icon2={Icons.appleB}>
            Logout
          </Button>
        </View>

        <H3 style={{color: ColorSet.red, textAlign: 'center', marginTop: 20}}>
          Delete Account?
        </H3>
      </View>

      <BottomSheet
        bottomSheetRef={bottomSheetUserLanguage}
        closeOnTouchBackdrop
        bottomCloseBtn={false}
        overlayOpacity={0.34}>
        <View>
          <View>
            <View
              style={[
                appStyle.rowBtw,
                appStyle.pv15,
                styles.uploadProfileSheetContainer,
              ]}>
              <View>
                <H4>Select language</H4>
              </View>
              <TouchableOpacity
                onPress={() =>
                  bottomSheetUserLanguage.current?.setModalVisible(false)
                }>
                <H4>Save</H4>
              </TouchableOpacity>
            </View>
            <View style={[styles.actionSheetHeight, appStyle.mh15]}>
              <ScrollView
                contentContainerStyle={styles.actionSheetScrollContainer}>
                <View style={appStyle.mb40}>
                  {languages.length > 0 &&
                    languages.map((lang, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => selectLanguage(lang)}
                          style={[
                            appStyle.rowBtw,
                            appStyle.actionSheetListing,
                          ]}>
                          <TouchableOpacity>
                            <Paragraph>{lang}</Paragraph>
                          </TouchableOpacity>
                          <Checkbox isActive={lang === userSelectedLanguage} />
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </BottomSheet>

    </Layout>
  );
};

const styles = StyleSheet.create({
  editActive: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    marginLeft: 20,
  },
  editInActive: {
    height: 35,
    width: 35,
    alignSelf: 'center',
    marginLeft: 20,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  actionSheetHeight: {
    maxHeight: screenHeight.height50,
  },
  uploadProfileSheetContainer: {
    backgroundColor: ColorSet.grayMedium,
    paddingHorizontal: 30,
  },
  actionSheetScrollContainer: {
    flexGrow: 1,
  },
});

export default ProfileScreen;

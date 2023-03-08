import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView
} from 'react-native';
import {Layout, Logo, Paragraph, Line, H2, H4, H3} from '../../components';
import Header from '../../components/navbar/Header';
import {ColorSet} from '../../styles';
import appStyle from '../../styles/appStyle';
import RightChatBox from '../../components/chat/RightChatBox';
import LeftChatBox from '../../components/chat/LeftChatBox';
import Input from '../../components/Input';
import {Images} from '../../constants/assets/images';

const isAndroid = Platform.OS === 'android';
const ConversationScreen: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const params = route?.params;
  const isAI = params?.isAI;
  const name = params?.name;

  const [body, setBody] = useState<string>('');
  return (
    <KeyboardAvoidingView
      behavior={!isAndroid ? 'padding' : 'height'}
      style={{flex: 1}}
      >
      <View style={appStyle.mh20}>
        <Header isBackButton={true} />
        <H3 style={styles.heading}>{name}</H3>
      </View>

      <Line customStyle={styles.line} />
      <ScrollView style={{flexGrow: 1}}>
        <View style={[styles.chatSection]}>
          <RightChatBox isAI={isAI}>Hello peter parker</RightChatBox>
          <LeftChatBox isAI={isAI}>Hello John Doe</LeftChatBox>
          <RightChatBox isAI={isAI}>Can I make a question</RightChatBox>
          <LeftChatBox isAI={isAI}>Sure, any question</LeftChatBox>
          <RightChatBox isAI={isAI}>Great</RightChatBox>
        </View>
      </ScrollView>
      
      <Input label={'Ask your query...'} value={body} setValue={setBody} />
      <View style={{position:'absolute',  bottom:38, right:22}}>
        <Image style={{height:50, width:50}} source={Images.send} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  heading: {
    marginBottom: -10,
    color: ColorSet.link,
    marginTop: 20,
  },
  line: {
    backgroundColor: ColorSet.gray,
  },
  chatSection: {
    paddingVertical: 10,
    height: '100%',
  },
});

export default ConversationScreen;

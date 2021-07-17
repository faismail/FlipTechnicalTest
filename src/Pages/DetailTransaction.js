import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import { Container, Content, Grid, Col, Card, Icon} from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';

const DetailTransaction = ({route, navigation: { goBack  }}) => {

    const { value } = route.params;

    const copyToClipboard = () => {
      Alert.alert('Copy to Clipboard');
    };

  return (
    <View style={styles.container}>
        <Col style={styles.Box} >
            <LinearGradient useAngle={true}
                            angle={136}
                            colors={['#D6F5F0' , '#63C0AF',]}
                            locations={[0,0.9831]}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={styles.CardTransaction}>

                          <View style={{ height:'15%', justifyContent:'center', flexDirection:'row'  }} >
                              <Text style={styles.BankText}>ID TRANSAKSI: #{value.id}</Text>
                              <TouchableOpacity onPress={copyToClipboard}>
                                 <Icon type="FontAwesome" name="copy" style={{marginTop:'15%', marginHorizontal:'9%', fontSize:RFValue(20, 680),  color:'#fd6542' }}/>
                              </TouchableOpacity>
                          </View>

                          <View style={{marginLeft:'5%', height:'15%', flexDirection:'row',  alignItems:'center',    }}>
                            <Text style={styles.TitleText}>DETAIL TRANSAKSI </Text>
                            <TouchableOpacity style={{marginLeft:'30%', marginTop:'2%',  alignItems:'center'}} onPress={() => goBack()}>
                                <Text style={styles.CloseText}>
                                  Tutup
                                </Text>
                            </TouchableOpacity>
                          </View>

                          <View style={{height:'10%', marginLeft:'5%',  flexDirection:'row',  }}>
                            <Text style={styles.BankText}>{value.sender_bank} </Text>      
                              <Icon type="FontAwesome" name="arrow-right" style={{marginTop:'3.5%', marginHorizontal:'6%', fontSize:RFValue(18, 680),  color:'black' }}/>
                            <Text style={styles.BankText}>{value.beneficiary_bank}</Text>
                          </View>
                
                          <View style={{height:'15%', marginLeft:'5%', flexDirection:'row', alignItems:'center', justifyContent:'space-between',  }}>
                            <View style={{ flexDirection:'column', }}>
                              <Text style={styles.TitleText}>{value.beneficiary_name}</Text>
                              <Text style={styles.TitleText}>{value.account_number}</Text>
                            </View>
                            <View style={{ flexDirection:'column', marginRight:'15%'}}>
                              <Text style={styles.TitleText}>NOMINAL</Text>
                              <Text style={styles.ContentText}>{value.amount}</Text>
                            </View>
                          </View>

                          <View style={{height:'15%', marginLeft:'5%', flexDirection:'row', alignItems:'center', justifyContent:'space-between', }}>
                            <View style={{ flexDirection:'column', }}>
                                <Text style={styles.TitleText}>BERITA TRANSFER</Text>
                                <Text style={styles.ContentText}>{value.remark}</Text>
                            </View>
                            <View style={{ flexDirection:'column', marginRight:'13%' }}>
                                <Text style={styles.TitleText}>Kode UNIK</Text>
                                <Text style={styles.ContentText}>{value.unique_code}</Text>
                            </View>                       
                          </View>

                          <View style={{height:'15%', marginLeft:'5%', flexDirection:'column', }}>
                              <Text style={styles.TitleText}>WAKTU DIBUAT</Text>
                              <Text style={styles.ContentText}>{value.created_at}</Text>
                          </View>
            </LinearGradient>
        </Col>          
    </View>
)};

const styles = StyleSheet.create({

container: {
  flex: 1,
  padding: 5,
  backgroundColor: '#DCECF6',
  },

Box: {
  width: '100%',
  height: '100%',
  padding: 5,
  alignItems:'center',

},

CardTransaction: {
  width: '100%',
  height:'70%',
  marginTop:'15%', 
  alignSelf:'center',
  borderRadius:8, 
  borderWidth:1,
  borderColor:'rgba(104, 148, 181, 0.5)', 
},

TitleText:{
  fontFamily: 'Avenir Next',
  fontWeight: '600',
  fontSize: RFValue(16,680),
  color:'black',
  marginTop:'3%',
},

BankText:{
  fontFamily: 'Avenir Next',
  fontWeight: '600',
  fontSize: RFValue(18,680),
  color:'black',
  marginTop:'3%',
},

ContentText:{
  fontFamily: 'Avenir Next',
  fontWeight: '500',
  fontSize: RFValue(16,680),
  color:'black',
  marginTop:'3%',
},

CloseText:{
  fontFamily: 'Avenir Next',
  fontWeight: '600',
  fontSize: RFValue(15,680),
  color:'#fd6542',
  textAlign:'center'
}

});

export default DetailTransaction;
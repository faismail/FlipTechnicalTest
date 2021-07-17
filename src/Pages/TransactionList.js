import React, {Component, useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView,} from 'react-native';
import { Container, Content, Grid, Col, Card, Icon, CheckBox, CardItem} from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import  Modal,{ ModalContent,  ScaleAnimation, ModalFooter, ModalButton, ModalTitle, SlideAnimation } from 'react-native-modals';
import { Alert } from 'react-native';

const TransactionList = ({navigation}) => {

  const [ListTransaction, setListTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [NamaAZ, setNamaAZ] = useState(false);
  const [NamaZA, setNamaZA] = useState(false);
  const [TanggalBaru, setTanggalBaru] = useState(false);
  const [TanggalLama, setTanggalLama] = useState(false);

  const cekAZ = () => {
    return NamaAZ ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };
  const cekZA = () => {
    return NamaZA ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };
  const cekRecent = () => {
    return TanggalBaru ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };
  const cekOld = () => {
    return TanggalLama ?  (
      <View style={[styles.radioButtonInner]} />
    ) : null
  };

  const handleChange = (e) => {
      setSearchName(e);
      // console.log(searchName);
    };

  const getTransactionList = async () => {

    setIsLoading(true)
    fetch('https://nextar.flip.id/frontend-test')
    .then((response) => response.json())
    .then((responseJson) => {
      setListTransaction(Object.values(responseJson))
      setIsLoading(false)
    })
    .catch((error) => {
      setIsLoading(false)
      console.error(error);
    });
  };

  const sortAZ = () => {
    ListTransaction.sort((a, b) => (a.beneficiary_name > b.beneficiary_name) ? 1 : -1)
    setModalVisible(false)
    setNamaAZ(true), setNamaZA(false), setTanggalBaru(false), setTanggalLama(false)
  };
  const sortZA = () => {
    ListTransaction.sort((a, b) => (b.beneficiary_name > a.beneficiary_name) ? 1 : -1)
    setModalVisible(false)
    setNamaAZ(false), setNamaZA(true), setTanggalBaru(false), setTanggalLama(false)
  };
  const sortRecent = () => {
    ListTransaction.sort((a, b) => (b.created_at > a.created_at) ? 1 : -1)
    setModalVisible(false)
    setNamaAZ(false), setNamaZA(false), setTanggalBaru(true), setTanggalLama(false)
  };
  const sortOld = () => {
    ListTransaction.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)
    setModalVisible(false)
    setNamaAZ(false), setNamaZA(false), setTanggalBaru(false), setTanggalLama(true)
  };

  useEffect(() => {
    getTransactionList()
  }, []);
  
    return (
      <SafeAreaView style={styles.container}>
          <Content style={styles.Box}  >
                    <Col style={{ marginVertical:'3%'}}>

                      <View style={styles.SearchBar}>
                        <Icon name="ios-search" style={{marginTop:'1%', marginHorizontal:'2%',  fontSize:RFValue(25, 680),  color:'black' }}/>
                          <TextInput
                              style={{ width:'60%'}}
                              placeholder="Cari Nama, Bank, atau Nominal"
                              placeholderTextColor="grey"
                              fontFamily="Avenir Next"
                              fontSize={16}
                              fontWeight={'500'}
                              autoCapitalize={'none'}
                              autoCorrect={false}
                              onChangeText={handleChange}
                            />
                          <TouchableOpacity style={{ width:'20%', flexDirection:'row', }} 
                                            onPress={() => setModalVisible (true) }>
                                <Text style={styles.SortingText}> 
                                  SORTING
                                </Text>
                                <Icon type="FontAwesome" name="caret-down" style={{ marginHorizontal:'5%',  fontSize:RFValue(18, 680),  color:'orange' }}/>
                          </TouchableOpacity>
                      </View>
                    </Col>

                    <Modal visible={ modalVisible }
                      onTouchOutside={() => setModalVisible (false) } 
                      swipeDirection={['up', 'down']} 
                      swipeThreshold={200} 
                      onSwipeOut={() => setModalVisible (false) }
                      modalAnimation={new SlideAnimation({slideFrom: 'bottom', initialValue: 0, useNativeDriver: (true) })}
                      >
                      <ModalContent style={{ backgroundColor: 'white' }} >

                          <Col style={{width:RFPercentage(35), height:RFPercentage(30), justifyContent:'center'}}>
                            <TouchableOpacity style={styles.mainContainer} onPress={ (sortAZ)}>
                              <View style={[styles.radioButtonIcon]}>
                                {cekAZ()}
                              </View>
                              <View style={[styles.radioButtonTextContainer]}>
                                <Text style={styles.SortText}>Nama A - Z</Text>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.mainContainer} onPress={ (sortZA)}>
                              <View style={[styles.radioButtonIcon]}>
                                {cekZA()}
                              </View>
                              <View style={[styles.radioButtonTextContainer]}>
                                <Text style={styles.SortText}>Nama Z - A</Text>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.mainContainer} onPress={ (sortRecent)}>
                              <View style={[styles.radioButtonIcon]}>
                                {cekRecent()}
                              </View>
                              <View style={[styles.radioButtonTextContainer]}>
                                <Text style={styles.SortText}>Tanggal Terbaru</Text>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.mainContainer} onPress={ (sortOld)}>
                              <View style={[styles.radioButtonIcon]}>
                                {cekOld()}
                              </View>
                              <View style={[styles.radioButtonTextContainer]}>
                                <Text style={styles.SortText}>Tanggal Terlama</Text>
                              </View>
                            </TouchableOpacity>
                          </Col>       
                      </ModalContent>
                    </Modal>

                    { 
                      ListTransaction.filter (value => {
                        if (searchName === "") {
                          return value
                        } 
                        else if (value.beneficiary_name.toString().toLowerCase().includes(searchName)){
                          return value
                        }
                        else if (value.sender_bank.toString().includes(searchName)){
                          return value
                        }
                        else if (value.beneficiary_bank.toString().includes(searchName)){
                          return value
                        }
                        else if (value.amount.toString().includes(searchName)){
                          return value
                        }
                      }).map((value, index) => (
                        <View key={index} style={{ marginVertical:'1%'  }}>
                          <TouchableOpacity  key={index} onPress={() => navigation.navigate('DetailTransaction', {value})}>

                            <Card  style={styles.CardTransaction}>
                              
                              <Col style={{ flex:1, flexDirection:'row'}}>
                              
                                  <Col style={{flex:2, justifyContent:'center', marginLeft:'5%', }}>
                    
                                    <View style={{flex:1, flexDirection:'row',  }}>
                                      <Text style={styles.BankText}>{value.sender_bank}</Text>      
                                        <Icon type="FontAwesome" name="arrow-right" style={{marginTop:'4%', marginHorizontal:'8%', fontSize:RFValue(18, 680),  color:'black' }}/>
                                      <Text style={styles.BankText}>{value.beneficiary_bank}</Text>
                                    </View>

                                    <Text style={styles.ListText}>{value.beneficiary_name} </Text>
                    

                                    <View style={{flex:1, flexDirection:'row', }}>
                                      <Text style={styles.ListText}>Rp.{value.amount}</Text>
                                        <Icon type="FontAwesome" name="circle" style={{marginTop:'7%', marginLeft:'4%', marginHorizontal:'4%', fontSize:RFValue(10, 680),  color:'black' }}/>
                                      <Text style={styles.ListText}>{value.created_at}</Text>
                                    </View>
                                  </Col>

                                  <Col style={{ alignItems:'center', justifyContent:'center',  }}>

                                  {(function() {
                                    if ((value.status) === 'SUCCESS')
                                    {
                                        return <View style={styles.statusSUCCES}>
                                                <Text style={styles.StatusText}>
                                                  {value.status}
                                                </Text>
                                              </View>
                                    } else {
                                        return <View style={styles.statusPENDING}>
                                                <Text style={styles.StatusText}>
                                                  {value.status}
                                                </Text>
                                              </View>       
                                    }
                                    })()}
                                  </Col>
                              </Col>
                            </Card>
                          </TouchableOpacity>
                        </View>
                      ))
                    }
          </Content>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
    padding: 5,
    backgroundColor: '#DCECF6',
    },
  inner: {
    flex: 1,
    backgroundColor: 'white',
    },
  Box: {
    width: '100%',
    height: '100%',
    padding: 5,
  },

  SearchBar: {
    width:RFPercentage(48.5),
    height:RFPercentage(5.5),
    marginHorizontal: 5,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 10,
    borderRadius: 8,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems:'center',
  },

  SortingText:{
    fontFamily: 'Avenir Next',
    fontWeight: '600',
    fontSize: RFValue(14,680),
    color: 'orange',
    textAlign: 'left',
  },
  CardTransaction: {
    width: '100%',
    height:RFPercentage(15),
    borderRadius:8, 
    flexDirection:'column',
    backgroundColor:'white',
    borderColor:'#CCCCCC',
    alignSelf:'center',
  },
  BankText:{
    fontFamily: 'Avenir Next',
    fontWeight: '600',
    fontSize: RFValue(18,680),
    color:'black',
    marginTop:'3%',
  },
  ListText:{
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    fontSize: RFValue(16,680),
    color:'black',
    marginTop:'5%',
  },
  SortText:{
    fontFamily: 'Avenir Next',
    fontWeight: '600',
    fontSize: RFValue(16,680),
    textAlign:'left',
    justifyContent:'center',
    color:'black',
  },
  statusSUCCES:{
    width:'95%', 
    height:'33%', 
    backgroundColor: "green",
    borderRadius:8, 
    alignItems:'center', 
    justifyContent:'center' , 
    marginRight:'15%'
  },
  statusPENDING:{
    width:'95%', 
    height:'33%', 
    backgroundColor: "#fd6542",
    borderRadius:8, 
    alignItems:'center', 
    justifyContent:'center' , 
    marginRight:'15%'
  },
  StatusText:{
    fontFamily: 'Avenir Next',
    fontWeight: '600',
    fontSize: RFValue(16,680),
    color: 'white',
    alignItems: 'center',
  },
  mainContainer: {
    height: RFPercentage(6),
    width: '100%',
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginVertical:'3%',
  },
  radioButtonIcon: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: '#fd6542',
    height: RFPercentage(4),
    width: RFPercentage(4),
    borderRadius: 20,
    marginRight: '5%',
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    height: RFPercentage(2.5),
    width: RFPercentage(2.5),
    backgroundColor:'#fd6542',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
  },
});

export default TransactionList;
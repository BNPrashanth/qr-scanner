/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';


export default class App extends Component {
  state = {
    scanned: false,
    qrcValid: false,
    qrcString: '',
    qrcStringParsed: {
      name: '',
      age: '',
      designation: ''
    }
  };

  onSuccess = (e) => {
    console.log(e);
    try {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.name && data.age && data.designation) {
        this.setState({ scanned: true, qrcString: e.data, qrcStringParsed: data, qrcValid: true });
      } else {
        this.setState({ scanned: true, qrcString: e.data, qrcStringParsed: null, qrcValid: false });
      }
    } catch(err) {
      console.log(e);
      this.setState({ scanned: true, qrcString: e.data, qrcStringParsed: null, qrcValid: false }, () => {
        console.log(this.state.qrcString);
      });
    }
  }

  onReactivate = () => {
    this.setState({ scanned: false });
    console.log(this.QRCScanner);
    // this.QRScannerRef.reactivate();
  }

  renderqrcString = () => {
    return (
      <View style={{flex: 1, padding: '10%'}}>
        <Text>Scan Completed..</Text>
        <Text>QR Code Data:</Text>
        <Text>{this.state.qrcString}</Text>
        <View style={{paddingVertical: 20, paddingLeft: 10}}>
          {
            this.state.qrcValid ?
            <View>
              <Text>Name: {this.state.qrcStringParsed.name}</Text>
              <Text>Age: {this.state.qrcStringParsed.age}</Text>
              <Text>Designation: {this.state.qrcStringParsed.designation}</Text> 
            </View> :
            <View>
              <Text>Scanned QRCode does not belong to the application.</Text>
            </View>
          }
        </View>
        <TouchableOpacity
          onPress={this.onReactivate}
          style={{paddingVertical: 5, paddingHorizontal: 10, borderWidth: 2, borderRadius: 5, borderColor: '#00BFFF', backgroundColor: '#87CEEB'}}
        >
          <Text style={{textAlign: 'center', color: 'black'}}>Scan Again..</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderQRCScanner = () => {
    return (
      <QRCodeScanner
        ref={(node) => this.QRCScanner = node}
        onRead={this.onSuccess.bind(this)}
        containerStyle={{justifyContent: 'center', alignItems: 'center'}}
        cameraStyle={{width: 200, height: 400}}
        cameraProps={{captureAudio: false}}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{width: '90%', height: '90%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
        >
          <Text style={{fontSize: 20, fontWeight: '800'}}>QR-Code Scanner:</Text>
          <View style={{flex: 1}}>
            { 
              !this.state.scanned
              ? this.renderQRCScanner()
              : this.renderqrcString()
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

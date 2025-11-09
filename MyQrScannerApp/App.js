// App.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-256-bit-secret'; // Must match the encrypting end

const App = () => {
    const [decryptedData, setDecryptedData] = useState(null);

    const onSuccess = e => {
        try {
            // Assume the QR data is an encrypted string
            const decrypted = CryptoJS.AES.decrypt(e.data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
            const json = JSON.parse(decrypted);
            setDecryptedData(json);
            sendToAPI(json);
        } catch (error) {
            setDecryptedData("Decryption or Parsing Failed: " + error.message);
        }
    };

    const sendToAPI = async (data) => {
        try {
            const response = await fetch('https://example.com/api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            // handle response here
        } catch (error) {
            // handle error here
        }
    };

    return (
        <View style={styles.container}>
            <QRCodeScanner
                onRead={onSuccess}
                showMarker
                reactivate
                reactivateTimeout={2000}
            />
            <Text>Decrypted Data: {JSON.stringify(decryptedData)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default App;

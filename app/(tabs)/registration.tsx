import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type MatchType = '1vs1' | '5vs5' | null;
type InsertAmount = 5000 | 10000 | 20000 | 50000 | null;

export default function RegistrationScreen() {
  const [nama, setNama] = useState('');
  const [idML, setIdML] = useState('');
  const [matchType, setMatchType] = useState<MatchType>(null);
  const [insertAmount, setInsertAmount] = useState<InsertAmount>(null);
  const [paymentProof, setPaymentProof] = useState<string | null>(null);

  const adminFee = 2000;
  const totalPayment = insertAmount ? insertAmount + adminFee : 0;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPaymentProof(result.assets[0].uri);
    }
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const handleSubmit = () => {
    // Validation
    if (!nama.trim()) {
      Alert.alert('Error', 'Nama harus diisi');
      return;
    }
    if (!idML.trim()) {
      Alert.alert('Error', 'ID Mobile Legend harus diisi');
      return;
    }
    if (!matchType) {
      Alert.alert('Error', 'Pilih jenis pertandingan');
      return;
    }
    if (!insertAmount) {
      Alert.alert('Error', 'Pilih jumlah insert');
      return;
    }
    if (!paymentProof) {
      Alert.alert('Error', 'Upload bukti pembayaran');
      return;
    }

    // Create WhatsApp message
    const message = `*PENDAFTARAN TURNAMEN MOBILE LEGENDS*\n\n` +
      `Nama: ${nama}\n` +
      `ID Mobile Legend: ${idML}\n` +
      `Jenis Pertandingan: ${matchType}\n` +
      `Insert: ${formatCurrency(insertAmount)}\n` +
      `Biaya Admin: ${formatCurrency(adminFee)}\n` +
      `Total Bayar: ${formatCurrency(totalPayment)}\n\n` +
      `Bukti pembayaran akan dikirim setelah pesan ini.`;

    const phoneNumber = '083160207988'; // Format: country code + number without leading 0
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert('Error', 'Tidak dapat membuka WhatsApp');
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header with Gradient Effect */}
      <View style={styles.headerGradient}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/mau 1 vs 1.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerSubtitle}>Pendaftaran Turnamen</Text>
          <View style={styles.headerDecor}>
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        {/* Nama */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>👤 Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nama lengkap"
            placeholderTextColor="#6b7280"
            value={nama}
            onChangeText={setNama}
          />
        </View>

        {/* ID Mobile Legend */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>🎯 ID Mobile Legend</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan ID ML"
            placeholderTextColor="#6b7280"
            value={idML}
            onChangeText={setIdML}
            keyboardType="numeric"
          />
        </View>

        {/* Jenis Pertandingan */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>⚔️ Jenis Pertandingan</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioButton, matchType === '1vs1' && styles.radioButtonActive]}
              onPress={() => setMatchType('1vs1')}
            >
              <View style={[styles.radioCircle, matchType === '1vs1' && styles.radioCircleActive]}>
                {matchType === '1vs1' && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.radioText, matchType === '1vs1' && styles.radioTextActive]}>
                1 vs 1
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioButton, matchType === '5vs5' && styles.radioButtonActive]}
              onPress={() => setMatchType('5vs5')}
            >
              <View style={[styles.radioCircle, matchType === '5vs5' && styles.radioCircleActive]}>
                {matchType === '5vs5' && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.radioText, matchType === '5vs5' && styles.radioTextActive]}>
                5 vs 5
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pilih Insert */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>💰 Pilih Insert</Text>
          <View style={styles.insertGrid}>
            {[5000, 10000, 20000, 50000].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.insertButton,
                  insertAmount === amount && styles.insertButtonActive,
                ]}
                onPress={() => setInsertAmount(amount as InsertAmount)}
              >
                <Text
                  style={[
                    styles.insertText,
                    insertAmount === amount && styles.insertTextActive,
                  ]}
                >
                  {formatCurrency(amount)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Total Bayar */}
        {insertAmount && (
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Insert:</Text>
              <Text style={styles.totalValue}>{formatCurrency(insertAmount)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Biaya Admin:</Text>
              <Text style={styles.totalValue}>{formatCurrency(adminFee)}</Text>
            </View>
            <View style={[styles.totalRow, styles.totalRowFinal]}>
              <Text style={styles.totalLabelFinal}>Total Bayar:</Text>
              <Text style={styles.totalValueFinal}>{formatCurrency(totalPayment)}</Text>
            </View>
          </View>
        )}

        {/* QR Code */}
        <View style={styles.qrContainer}>
          <Text style={styles.label}>📱 Scan QR untuk Pembayaran</Text>
          <View style={styles.qrWrapper}>
            <Image
              source={require('@/assets/images/qr-payment.png')}
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.qrHint}>Scan kode QR di atas untuk melakukan pembayaran via DANA</Text>
        </View>

        {/* Bukti Pembayaran */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>📸 Bukti Pembayaran</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>
              {paymentProof ? '✅ Bukti Terupload' : '📎 Upload Bukti Pembayaran'}
            </Text>
          </TouchableOpacity>
          {paymentProof && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: paymentProof }} style={styles.previewImage} />
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>💳 Bayar & Kirim ke WhatsApp</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          ✨ Data akan dikirim ke WhatsApp untuk verifikasi pembayaran
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerGradient: {
    backgroundColor: '#1e293b',
    paddingTop: Platform.OS === 'web' ? 20 : 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 20,
    position: 'relative',
    alignItems: 'center',
  },
  headerLogo: {
    width: Platform.OS === 'web' ? 400 : 280,
    height: Platform.OS === 'web' ? 200 : 140,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(99, 102, 241, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    fontWeight: '500',
  },
  headerDecor: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 150,
    height: 150,
  },
  decorCircle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    top: 0,
    right: 0,
  },
  decorCircle2: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    top: 40,
    right: 40,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 2,
    borderColor: '#334155',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  radioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#334155',
  },
  radioButtonActive: {
    borderColor: '#dc2626',
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#64748b',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleActive: {
    borderColor: '#dc2626',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#dc2626',
  },
  radioText: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  radioTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  insertGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insertButton: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  insertButtonActive: {
    borderColor: '#dc2626',
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
  },
  insertText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  insertTextActive: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 17,
  },
  totalContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#334155',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalRowFinal: {
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#334155',
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 15,
    color: '#94a3b8',
  },
  totalValue: {
    fontSize: 15,
    color: '#f1f5f9',
    fontWeight: '600',
  },
  totalLabelFinal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalValueFinal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  qrContainer: {
    marginBottom: 24,
  },
  qrWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  qrImage: {
    width: 280,
    height: 280,
  },
  qrHint: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 12,
    fontStyle: 'italic',
  },
  uploadButton: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#dc2626',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: '700',
  },
  previewContainer: {
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#334155',
  },
  previewImage: {
    width: '100%',
    height: 200,
  },
  submitButton: {
    backgroundColor: '#dc2626',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerNote: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 13,
    marginTop: 20,
    fontStyle: 'italic',
  },
});

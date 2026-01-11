import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ExploreScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/mau 1 vs 1.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerSubtitle}>Informasi & Panduan Turnamen</Text>
      </View>

      {/* Tournament Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Info Turnamen</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅 Jadwal</Text>
            <Text style={styles.infoValue}>Setiap Weekend</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🎮 Platform</Text>
            <Text style={styles.infoValue}>Mobile Legends</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💰 Total Hadiah</Text>
            <Text style={styles.infoValue}>Jutaan Rupiah</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👥 Peserta</Text>
            <Text style={styles.infoValue}>Unlimited</Text>
          </View>
        </View>
      </View>

      {/* Rules Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📜 Peraturan Turnamen</Text>

        <View style={styles.ruleCard}>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>1</Text>
            <Text style={styles.ruleText}>
              Peserta wajib melakukan pembayaran insert sebelum pertandingan dimulai
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>2</Text>
            <Text style={styles.ruleText}>
              Dilarang menggunakan cheat, hack, atau program ilegal lainnya
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>3</Text>
            <Text style={styles.ruleText}>
              Peserta harus hadir 15 menit sebelum pertandingan dimulai
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>4</Text>
            <Text style={styles.ruleText}>
              Keputusan panitia tidak dapat diganggu gugat
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>5</Text>
            <Text style={styles.ruleText}>
              Bersikap sportif dan menjaga etika selama pertandingan
            </Text>
          </View>
        </View>
      </View>

      {/* Prize Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Hadiah</Text>

        <View style={styles.prizeContainer}>
          <View style={styles.prizeCard}>
            <Text style={styles.prizeEmoji}>🥇</Text>
            <Text style={styles.prizeRank}>Juara 1</Text>
            <Text style={styles.prizeAmount}>60% Pool Prize</Text>
          </View>

          <View style={styles.prizeCard}>
            <Text style={styles.prizeEmoji}>🥈</Text>
            <Text style={styles.prizeRank}>Juara 2</Text>
            <Text style={styles.prizeAmount}>30% Pool Prize</Text>
          </View>

          <View style={styles.prizeCard}>
            <Text style={styles.prizeEmoji}>🥉</Text>
            <Text style={styles.prizeRank}>Juara 3</Text>
            <Text style={styles.prizeAmount}>10% Pool Prize</Text>
          </View>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💳 Metode Pembayaran</Text>

        <View style={styles.paymentCard}>
          <Text style={styles.paymentEmoji}>📱</Text>
          <Text style={styles.paymentTitle}>DANA</Text>
          <Text style={styles.paymentDescription}>
            Scan QR Code yang tersedia di halaman pendaftaran untuk melakukan pembayaran via DANA
          </Text>
          <View style={styles.paymentBadge}>
            <Text style={styles.paymentBadgeText}>Aman & Terpercaya</Text>
          </View>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❓ FAQ</Text>

        <View style={styles.faqContainer}>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Bagaimana cara mendaftar?</Text>
            <Text style={styles.faqAnswer}>
              Klik tab "Daftar", isi form pendaftaran, pilih insert, scan QR untuk pembayaran,
              upload bukti, dan kirim via WhatsApp.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Berapa biaya admin?</Text>
            <Text style={styles.faqAnswer}>
              Biaya admin sebesar Rp 2.000 akan ditambahkan otomatis ke nominal insert yang dipilih.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Kapan turnamen dimulai?</Text>
            <Text style={styles.faqAnswer}>
              Turnamen diadakan setiap weekend. Jadwal detail akan diinformasikan via WhatsApp
              setelah pendaftaran dikonfirmasi.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Bagaimana cara klaim hadiah?</Text>
            <Text style={styles.faqAnswer}>
              Hadiah akan ditransfer langsung ke akun DANA pemenang maksimal 24 jam setelah
              turnamen selesai.
            </Text>
          </View>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📞 Hubungi Kami</Text>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => openLink('https://wa.me/6283160207988')}
        >
          <Text style={styles.contactEmoji}>💬</Text>
          <Text style={styles.contactTitle}>WhatsApp</Text>
          <Text style={styles.contactNumber}>0831 6020 7988</Text>
          <View style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Chat Sekarang</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Untuk informasi lebih lanjut, silakan hubungi kami via WhatsApp
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
  header: {
    backgroundColor: '#1e293b',
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  headerLogo: {
    width: Platform.OS === 'web' ? 400 : 280,
    height: Platform.OS === 'web' ? 200 : 140,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#334155',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
  },
  ruleCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#334155',
    gap: 16,
  },
  ruleItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  ruleNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dc2626',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
  },
  ruleText: {
    flex: 1,
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  prizeContainer: {
    gap: 16,
  },
  prizeCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  prizeEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  prizeRank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  prizeAmount: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: '600',
  },
  paymentCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  paymentEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  paymentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  paymentBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  paymentBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  faqContainer: {
    gap: 16,
  },
  faqItem: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#334155',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 22,
  },
  contactCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  contactEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  contactNumber: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});

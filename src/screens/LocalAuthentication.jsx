// ... (código anterior)

export default function DeviceInfo({ navigation }) {
  const [isAuthLocked, setIsAuthLocked] = useState(false);

  const handleAuthenticateB = async () => {
    if (isAuthLocked) {
      alert('Autenticação bloqueada por passar do limite.');
      return;
    }

    try {
      const isAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isAvailable) {
        alert('A autenticação biométrica não está disponível neste dispositivo.');
        return;
      }

      const { success, error } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Toque no sensor biométrico para autenticar.',
      });

      if (success) {
        alert('Autenticação biométrica bem-sucedida!');
      } else {
        setIsAuthLocked(true);
        setTimeout(() => {
          setIsAuthLocked(false);
        }, 5000);
        alert('Autenticação biométrica falhou ou foi cancelada.');
      }
    } catch (error) {
      console.error('Erro na autenticação biométrica:', error);
    }
  };

  const handleAuthenticateF = async () => {
    if (isAuthLocked) {
      alert('Autenticação bloqueada por passar do limite.');
      return;
    }

    try {
      const isAvailable = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (!isAvailable.includes(2)) {
        alert('A autenticação facial não está disponível neste dispositivo.');
        return;
      }

      const { success, error } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Olhe para a câmera para autenticar.',
      });

      if (success) {
        alert('Autenticação facial bem-sucedida!');
      } else {
        setIsAuthLocked(true);
        setTimeout(() => {
          setIsAuthLocked(false);
        }, 5000);
        alert('Autenticação facial falhou ou foi cancelada.');
      }
    } catch (error) {
      console.error('Erro na autenticação facial:', error);
    }
  };

  return (
    <View
      style={styles.container}
      accessibilityLabel='Expo Device'
    >
      <Header title="Autenticação" />
      <View style={styles.container2}>
        <TouchableOpacity style={styles.button} onPress={handleAuthenticateB}>
          <Text style={styles.text}>Autenticar Biométrico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAuthenticateF}>
          <Text style={styles.text}>Autenticar Facial</Text>
        </TouchableOpacity>
      </View>
      <Footer
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

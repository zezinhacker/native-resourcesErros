import { Pressable, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    content: {
        margin: 5,
        borderRadius: 5,
        backgroundColor: "#CCC",
        paddingBottom: 12,
    },
    title: {
        fontSize: 18,
        padding: 12,
        borderRadius: 5,
        color: "#FFF",
        backgroundColor: "#636"
    },
    text: {
        fontSize: 14,
        padding: 2,
        paddingLeft: 12,
    }
});

export default function Items({ item, exibirAlerta }) {
  return (
    <Pressable
        onPress={() => exibirAlerta(item)}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          {item.name}
        </Text>

        { item?.emails?.length > 0
            ? <Text style={styles.text}>
                {item.emails[0].email}
            </Text>
            : <></>
        }

        { item?.phoneNumbers?.length > 0
            ? <Text style={styles.text}>
                {item.phoneNumbers[0].number}
            </Text>
            : <></>
        }
      </View>
    </Pressable>
  )
}
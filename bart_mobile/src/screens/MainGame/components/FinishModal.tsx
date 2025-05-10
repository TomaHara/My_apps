import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FinishModalProps {
  visible: boolean;
  onFinish: () => void;
}

export const FinishModal: React.FC<FinishModalProps> = ({
  visible,
  onFinish,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onFinish}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            お疲れ様でした。ゲームが終了しました。
          </Text>
          <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
            <Text style={styles.finishButtonText}>ゲーム終了</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxWidth: '80%',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  finishButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

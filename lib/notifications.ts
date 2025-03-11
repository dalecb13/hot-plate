import Toast, { ToastType } from 'react-native-toast-message';

export const showToast = (toastType: ToastType, message: string) => {
  Toast.show({
    type: toastType,
    text1: message,
  });
}

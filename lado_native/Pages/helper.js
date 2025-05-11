export const colorSchema = {
  primary: '#E53935', // Red (Call-to-action, buttons)
  secondary: '#FFFFFF', // White (Background, text areas)
  accent: '#424242', // Dark Gray (Text, icons)
  success: '#4CAF50', // Green (Success messages, order completed)
  warning: '#FFC107', // Yellow (Alerts, promotions)
  error: '#D32F2F', // Dark Red (Errors, warnings)
  background: '#FFFFFF', // White (Main background)
  text: '#212121', // Almost black (Primary text)
  border: '#E0E0E0', // Light Gray (Dividers, card borders)
};

export const theme = {
  background: {
    pimary: '#6A1B9A',
    dark: '#512DA8',
    white: '#FFFFFF',
    darkBlack: '#000000',
    lightBlack: '#000000c7',
  },
  font: {
    heading: {
      fontFamily: 'Poppins-SemiBold', // Used for headings, dish names, key labels
      fontSize: 20,
      color: '#000', // Default text color, can be overridden
    },
    body: {
      fontFamily: 'Poppins-Regular', // Used for body text, descriptions, secondary info
      fontSize: 14,
      color: '#666', // Soft gray for secondary content
    },
    highlight: {
      fontFamily: 'Poppins-Bold', // Used for pricing, call-to-action buttons
      fontSize: 16,
      color: '#673AB7', // Primary brand color
    },
  },
  tabIconColor: '#673AB7',
  iconColor: '#eeeeee',
  textInput: '#000000c7',
};

export const isEmpty = value => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string' && value.trim() !== '') return false;
  if (typeof value === 'number') return false;
  if (typeof value === 'object' && Object.keys(value)?.length >= 1)
    return false;
  if (Array.isArray(value) && value.length >= 1) return false;
  return true;
};

export const safeText = (text, length = 20) => {
  if (isEmpty(text)) return 'N/A';
  const finalString = text.slice(0, length);
  return finalString + (text.length > length ? '...' : '');
};

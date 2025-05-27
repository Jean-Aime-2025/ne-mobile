import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { PoppinsBold, PoppinsMedium, PoppinsSemiBold } from '../SyledText';

interface ExpenseCardProps {
  name: string;
  amount: string | number;
  date?: string;
  onDetails: () => void;
  onDelete: () => void;
}

const formatDate = (dateStr: string): string => {
  const dateObj = new Date(dateStr);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const ExpenseCard: React.FC<ExpenseCardProps> = ({ name, amount, date, onDetails, onDelete }) => (
  <View
    className="flex-row items-center bg-white rounded-xl shadow-lg p-4 mb-3"
    style={{ elevation: 3 }}
  >
    <View className="flex-1">
      <PoppinsSemiBold className="text-lg text-gray-800">{name}</PoppinsSemiBold>
      <PoppinsBold className="text-base text-primary mt-1">$ {amount}</PoppinsBold>
      {date && (
        <PoppinsMedium className="text-xs text-gray-400 mt-1">{formatDate(date)}</PoppinsMedium>
      )}
    </View>
    <TouchableOpacity
      className="mr-3"
      onPress={onDetails}
      style={{ padding: 6, borderRadius: 8, backgroundColor: '#f1f5f9' }}
    >
      <Feather name="info" size={20} color="#2563eb" />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onDelete}
      style={{ padding: 6, borderRadius: 8, backgroundColor: '#fee2e2' }}
    >
      <Feather name="trash-2" size={20} color="#dc2626" />
    </TouchableOpacity>
  </View>
);

export default ExpenseCard;

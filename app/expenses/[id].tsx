import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { getExpenseById } from '@/services/expense.service';
import Feather from '@expo/vector-icons/Feather';
import { PoppinsBold, PoppinsMedium, PoppinsRegular, PoppinsSemiBold } from '@/components/SyledText';

export default function ExpenseDetailScreen() {
  const { id } = useLocalSearchParams();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (typeof id === 'string') {
        const data = await getExpenseById(id);
        setExpense(data);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <View className="flex-1 items-center justify-center"><ActivityIndicator size="large" color="#2563eb" /></View>;
  if (!expense) return <Text>Expense not found</Text>;

  return (
    <View className="flex-1 bg-background justify-center px-6">
      <View className="bg-white rounded-2xl shadow-lg p-6 mt-16">
        <View className="flex-row items-center mb-4">
          <Feather name="file-text" size={28} color="#2563eb" />
          <PoppinsBold className="text-2xl text-primary ml-3">{expense.name}</PoppinsBold>
        </View>
        <Text className="text-lg text-gray-700 mb-2">
          <Feather name="dollar-sign" size={18} color="#22c55e" />{' '}
          <PoppinsSemiBold>${expense.amount}</PoppinsSemiBold>
        </Text>
        <PoppinsRegular className="text-base text-gray-500 mb-4">
          <Feather name="calendar" size={16} color="#64748b" />{' '}
          {new Date(expense.createdAt).toLocaleString()}
        </PoppinsRegular>
        <PoppinsMedium className="text-base text-gray-700">
          <Feather name="align-left" size={16} color="#2563eb" />{' '}
          {expense.description || <Text className="italic text-gray-400">No description</Text>}
        </PoppinsMedium>
      </View>
    </View>
  );
}

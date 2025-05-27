import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { createExpense, deleteExpense, getExpenseById, getExpenses } from '@/services/expense.service';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setExpenses(sorted);
    } catch (error) {
      Alert.alert('Error', 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    try {
      const newExpense = await createExpense(expense);
      setExpenses((prev) => [newExpense, ...prev]);
      Alert.alert('Success', 'Expense added successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense');
    }
  };

  const removeExpense = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExpense(id);
              setExpenses((prev) => prev.filter((e) => e.id !== id));
              Alert.alert('Deleted', 'Expense removed');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete expense');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const fetchExpense = async (id: string) => {
    return await getExpenseById(id);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return { expenses, loading, addExpense, removeExpense, fetchExpense };
};

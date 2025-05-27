import Loader from '@/components/common/loader';
import { useExpenses } from '@/hooks/useExpense';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { PoppinsBold, PoppinsMedium } from '@/components/SyledText';

export default function AddExpenseScreen() {
  const { addExpense } = useExpenses();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    // Trim inputs
    const trimmedName = name.trim();
    const trimmedAmount = amount.trim();

    // Basic validation
    if (!trimmedName || !trimmedAmount) {
      alert('Name and amount are required.');
      return;
    }

    // Check if amount is a valid number
    const numericAmount = parseFloat(trimmedAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Amount must be a valid positive number.');
      return;
    }

    setLoading(true);

    try {
      await addExpense({
        name: trimmedName,
        amount: numericAmount.toString(),
        description: description.trim(),
      });
      router.back();
    } catch (error) {
      alert('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background z-10"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ position: 'relative' }}
    >
      <View className="flex-1 justify-center px-6">
        <View className="bg-white rounded-2xl shadow-lg p-6">
          <PoppinsBold className="text-2xl text-primary mb-4">Add New Expense</PoppinsBold>
          <TextInput
            placeholder="Name"
            onChangeText={setName}
            value={name}
            className="bg-gray-100 rounded-full px-4 py-3 mb-3 text-base"
            style={{ fontFamily: 'Poppins-Regular' }}
          />
          <TextInput
            placeholder="Amount"
            onChangeText={setAmount}
            value={amount}
            keyboardType="numeric"
            className="bg-gray-100  rounded-full px-4 py-3 mb-3 text-base"
            style={{ fontFamily: 'Poppins-Regular' }}
          />
          <TextInput
            placeholder="Description"
            onChangeText={setDescription}
            value={description}
            className="bg-gray-100  rounded-full px-4 py-3 mb-5 text-base"
            style={{ fontFamily: 'Poppins-Regular' }}
            multiline
          />
          <TouchableOpacity
            className="bg-primary rounded-full py-3 flex-row items-center justify-center"
            onPress={handleAdd}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Feather name="plus-circle" size={20} color="white" />
                <PoppinsMedium className="text-white text-base font-semibold ml-2">Add Expense</PoppinsMedium>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
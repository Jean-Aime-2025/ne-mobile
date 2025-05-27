import { useExpenses } from '@/hooks/useExpense';
import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Loader from '@/components/common/loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/common/header';
import Feather from '@expo/vector-icons/Feather';
import ExpenseCard from '@/components/common/expense-card';

export default function ExpenseListScreen() {
  const { expenses, loading, removeExpense } = useExpenses();  
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); 

  const filteredExpenses = expenses.filter((expense) =>   
    expense.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView className='bg-background flex-1'>
      <View className="px-4 py-4 flex-1 flex-col relative">
        <Loader isLoading={loading} />

        {/* Header with Welcome and Logout */}
        <Header />

        {/* Search Input */}
        <View
          className="flex flex-row items-center gap-2 bg-white border border-[#E2E8F0] rounded-full mb-4"
          style={{ paddingHorizontal: 15, paddingVertical: 2 }}
        >
          <Feather name="search" size={24} color="black" />
          <TextInput
            placeholder="Search expense..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="flex-1"
            style={{ fontFamily: 'Poppins-Regular' }}
          />
        </View>

        {/* Add Button */}
        <TouchableOpacity
          className="bg-primary p-4 rounded-full shadow-lg"
          style={{ elevation: 5, position: 'absolute', bottom: 20, right: 20, zIndex: 1000 }}
          onPress={() => router.push('/expenses/add')}
        >
          <Entypo name="plus" size={24} color="white" />
        </TouchableOpacity>

        {/* Expense List */}
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No matching expenses found.</Text>}
          renderItem={({ item }) => (
            <ExpenseCard
              name={item.name}
              amount={item.amount}
              date={item.createdAt}
              onDetails={() => router.push(`/expenses/${item.id}` as any)}
              onDelete={() => removeExpense(item.id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
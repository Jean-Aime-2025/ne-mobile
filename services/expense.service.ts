import api from './api';

export const getExpenses = async (): Promise<Expense[]> => {
  const res = await api.get('/expenses');
  return res.data;
};

export const getExpenseById = async (id: string): Promise<Expense> => {
  const res = await api.get(`/expenses/${id}`);
  return res.data;
};

export const createExpense = async (expense: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> => {
  const res = await api.post('/expenses', expense);
  return res.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await api.delete(`/expenses/${id}`);
};

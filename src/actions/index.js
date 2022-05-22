// Coloque aqui suas actions
export const actionWallet = (wallet) => ({
  type: 'WALLET',
  ...wallet,
});
export const currencyWallet = (currency) => ({
  type: 'CURRENCY',
  currency,
});
export const expenseWallet = (expense) => ({
  type: 'EXPENSE',
  expense,
});
export const actionUser = (user) => ({
  type: 'USER',
  ...user,
});

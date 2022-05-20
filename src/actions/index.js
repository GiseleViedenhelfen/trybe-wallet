// Coloque aqui suas actions
export const actionWallet = (wallet) => ({
  type: 'WALLET',
  ...wallet,
});
export const actionUser = (user) => ({
  type: 'USER',
  ...user,
});

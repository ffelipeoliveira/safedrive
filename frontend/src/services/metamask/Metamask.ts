import { ethers } from 'ethers';

type EthereumRequestArgs = {
  method: string;
  params?: string[];
};

type EthereumProvider = {
  request: (args: EthereumRequestArgs) => Promise<string[]>;
  on: (event: string, callback: (...args: string[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const isMetaMaskInstalled = (): boolean => {
  return typeof window.ethereum !== 'undefined';
};

export const requestAccount = async (): Promise<string | undefined> => {
  if (!isMetaMaskInstalled()) {
    alert('MetaMask is not installed!');
    return;
  }

  try {
    const accounts: string[] = await window.ethereum!.request({
      method: 'eth_requestAccounts',
    });
    return accounts[0];
  } catch (error) {
    console.error('Failed to request account:', error);
  }
};

export const getCurrentAccount = async (): Promise<string | undefined> => {
  if (!isMetaMaskInstalled()) {
    alert('Extensão MetaMask não está instalada!');
    return;
  }

  try {
    const accounts: string[] = await window.ethereum!.request({
      method: 'eth_accounts',
    });
    return accounts[0];
  } catch (error) {
    console.error('Failed to get current account:', error);
  }
};

export const getNetwork = async (): Promise<string | undefined> => {
  if (!isMetaMaskInstalled()) {
    alert('Extensão MetaMask não está instalada!');
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum!);
    const network = await provider.getNetwork();
    return network.name;
  } catch (error) {
    console.error('Failed to get network:', error);
  }
};

// Lidar com mudanças na rede
export const listenToNetworkChanges = (callback: (network: string | undefined) => void): void => {
  if (isMetaMaskInstalled()) {
    window.ethereum!.on('chainChanged', () => {
      getNetwork().then(callback);
    });
  }
};

// Lidar com mudanças na conta
export const listenToAccountChanges = (callback: (accounts: string) => void): void => {
  if (isMetaMaskInstalled()) {
    window.ethereum!.on('accountsChanged', callback);
  }
};

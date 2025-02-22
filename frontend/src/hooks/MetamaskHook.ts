import { useEffect, useState } from 'react';
import {
  requestAccount,
  getCurrentAccount,
  listenToAccountChanges,
  listenToNetworkChanges,
  getNetwork, 
} from '../services/metamask/Metamask';

interface MetaMaskHook {
  account: string | undefined;
  network: string | undefined;
  isMetaMaskInstalled: boolean;
  connectMetaMask: () => Promise<void>;
}

function useMetaMask(): MetaMaskHook {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [network, setNetwork] = useState<string | undefined>(undefined);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

  useEffect(() => {
    const checkMetaMaskInstallation = () => {
      setIsMetaMaskInstalled(typeof window.ethereum !== 'undefined');
    };

    checkMetaMaskInstallation();

    if (isMetaMaskInstalled) {
      const loadAccountAndNetwork = async () => {
        try {
          const currentAccount = await getCurrentAccount();
          setAccount(currentAccount);

          const currentNetwork = await getNetwork();
          setNetwork(currentNetwork);
        } catch (error) {
          console.error('Erro ao carregar conta ou rede:', error);
        }
      };

      loadAccountAndNetwork();

      listenToAccountChanges((accounts: string[]) => {
        setAccount(accounts.length > 0 ? accounts[0] : undefined);
      });

      listenToNetworkChanges((network: string) => {
        setNetwork(network);
      });
    }
  }, [isMetaMaskInstalled]);

  const connectMetaMask = async () => {
    try {
      const connectedAccount = await requestAccount();
      setAccount(connectedAccount);
    } catch (error) {
      console.error('Erro ao conectar ao MetaMask:', error);
    }
  };

  return {
    account,
    network,
    isMetaMaskInstalled,
    connectMetaMask,
  };
}

export default useMetaMask;

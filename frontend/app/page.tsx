"use client"
import ConnectWalletDialog from "@/components/ConnectWallet/ConnectWalletDialog";
import TransactionForm from "@/components/TransactionForm/TransactionForm";
import { TransactionColumns } from "@/components/TransactionsTable/TransactionColumn";
import { TransactionTable } from "@/components/TransactionsTable/TransactionTable";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useMemo } from "react";
import { useAccount, useDisconnect, useReadContract, useWriteContract } from "wagmi";
import abi from "../abi/abi.json"
export default function Home() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { data, isLoading, isError,error} = useReadContract({
    address:process.env.SMART_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "getAllTransactions",
    // args:[BigInt(1)]
  })
  console.log("TABLE DATA", data, isError,isLoading, error);
  return ( 
    <div className="flex flex-col h-full w-full justify-center items-center">
      <h1 className="text-2xl font-bold my-2">Expense tracker</h1>
      <Toaster />
      {
        isConnected ?
          <div className="flex flex-col my-2 justify-center items-center w-full">
            <div className="w-full flex px-2 my-2 justify-end"><TransactionForm /></div>
            <div className="w-full px-2 my-2">
              <TransactionTable data={[]} columns={TransactionColumns} />
            </div>
            <Button variant="default" onClick={()=>disconnect()}>Disconnect</Button>
          </div>
        : <ConnectWalletDialog />
      }
    </div>
  );
}

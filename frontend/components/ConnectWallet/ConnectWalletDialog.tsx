"use client";
import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { useConnect } from 'wagmi';
import { Button } from '../ui/button';

const ConnectWalletDialog = () => {
    const {connect, connectors} = useConnect()
    return (<Dialog>
        <DialogTrigger className="bg-slate-300 text-black font-bold p-2 rounded-sm">Connect Wallet</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Connect to your desired wallet</DialogTitle>
                <DialogDescription className='flex py-4 w-full items-center justify-between'>
                    {connectors.map((connector) => <Button className='' key={connector.uid} onClick={()=>connect({connector})}>{connector.name}</Button>)}
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default ConnectWalletDialog
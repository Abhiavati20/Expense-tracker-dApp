import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import SelectInput from '../SelectInput/SelectInput'
import { ISelectInputOptions } from '@/lib/utils'
import { Button } from '../ui/button'
import abi from "../../abi/abi.json"
import { toast, useToast } from '@/hooks/use-toast'
import { Toaster } from '../ui/toaster'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
const paymentTypeOptions: ISelectInputOptions[] = [
    {
        option: "UPI",
        value:"UPI"
    },
    {
        option: "Cash",
        value: "Cash"
    },
    {
        option: "Card",
        value: "Card"
    }
]

const categoryOptions: ISelectInputOptions[] = [
    {
        option: "Expense",
        value:"Expense"
    },
    {
        option: "Saving",
        value: "Saving"
    },
    {
        option: "Investment",
        value: "Investment"
    }
]

enum Category {
    Expense,
    Saving,
    Investment
}

// enum for payment mode
enum PaymentType {
    UPI,
    Cash,
    Card
}

const TransactionForm = () => {
    const {toast} = useToast()
    const [transaction, setTransaction] = useState<{ description: string; amount: number; paymentType: string, category: string }>({
        description: "",
        amount: 0,
        paymentType: "",
        category:""
    })

    const { data:hash, isPending, isSuccess, writeContract } = useWriteContract()
    const {isLoading:hashLoading, isSuccess:hashSuccess} = useWaitForTransactionReceipt({hash})
    function handleSubmit() {
        if (transaction.amount === 0 || transaction.category === "" || transaction.paymentType === "" || transaction.description === "") {
            toast({
                title: "Please fill all the transaction details!",
                variant: "destructive"
            })
        }    
        writeContract({
            address: process.env.SMART_CONTRACT_ADDRESS as `0x${string}`,
            abi,
            functionName: "createTransaction",
            args:[BigInt(transaction.amount),Category[transaction.category], PaymentType[transaction.paymentType],transaction.description]
        })

    
    }
    console.log("HASH",hash)
    useEffect(() => {
        if (hashSuccess) {
            return toast({
                title: "Transaction Complete",
                variant:"default"
            })
        }
        
    }, [hashSuccess, hash, toast])
    return (
        <Dialog>
            
            <DialogTrigger className="bg-slate-300 text-black font-bold p-2 rounded-sm">
                Add Expense
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>You can add expense, saving, investment below</DialogTitle>
                
                </DialogHeader>
                <DialogDescription className='flex flex-col py-4 w-fulDialogDescriptionstify-between'>
                    {/* <Textarea placeholder='Enter Description ex: Salary / Grocery / Trip' /> */}
                    <div className='my-2 flex w-full justify-between items-center'>
                        <Input className='mx-2 shadow-none' onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setTransaction({...transaction, description:event.target.value})} type='tex' placeholder='Description ex: Salary / Grocery / Trip' />
                        <Input className='mx-2 shadow-none' onChange={(event:React.ChangeEvent<HTMLInputElement>)=> setTransaction({...transaction, amount:+event.target.value})} type='number' placeholder='Enter amount in RS' />
                    </div>
                    <div className='my-2 flex w-full justify-between items-center'>
                        <SelectInput options={paymentTypeOptions} onChange={(value:string) => setTransaction({...transaction,paymentType:value})} placeholder='Payment Type' />
                        
                        <SelectInput options={categoryOptions} onChange={(value:string) => setTransaction({...transaction, category:value})} placeholder='Category' />
                    </div>
                    <Button disabled={isPending} className='w-1/4 m-2'type='submit' onClick={handleSubmit}>{isPending ?"Confirming":"Submit"}</Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default TransactionForm
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import SelectInput from '../SelectInput/SelectInput'
import { ISelectInputOptions } from '@/lib/utils'
import { Button } from '../ui/button'

const paymentTypeOptions: ISelectInputOptions[] = [
    {
        option: "UPI",
        value:"UPI"
    },
    {
        option: "CASH",
        value: "CASH"
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
const TransactionForm = () => {
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
                        <Input className='mx-2 shadow-none' type='tex' placeholder='Description ex: Salary / Grocery / Trip' />
                        <Input className='mx-2 shadow-none' type='number' placeholder='Enter amount in RS' />
                    </div>
                    <div className='my-2 flex w-full justify-between items-center'>
                        <SelectInput options={paymentTypeOptions} placeholder='Payment Type' />
                        
                        <SelectInput options={categoryOptions} placeholder='Category' />
                    </div>
                    <Button className='w-1/4 m-2'>Submit</Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default TransactionForm
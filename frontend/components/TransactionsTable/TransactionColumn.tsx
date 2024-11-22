"use client";
import { ColumnDef } from "@tanstack/react-table";

enum Category {
    Expense,
    Saving,
    Investment
};

enum PaymentType {
    UPI,
    Cash,
    Card
};

interface Transaction {
    _id: bigint,
    _amount: bigint,
    _category: Category,
    _paymentType: PaymentType,
    _timestamp: Date,
    _description: string
}

export const TransactionColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "_amount",
        header:"Amount"
    },
    {
        accessorKey: "_category",
        header:"Category"
    },
    {
        accessorKey: "_paymentType",
        header:"Payment Type"
    },
    {
        accessorKey: "_timestamp",
        header:"Date"
    },
    {
        accessorKey: "_description",
        header:"Description"
    },
    {
        id: "actions",
        header:"Edit/Delete"
    }
]
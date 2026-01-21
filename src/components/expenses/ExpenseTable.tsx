"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, cn } from "@/lib/utils";
import type { CategorySummary } from "@/types";
import {
    Car,
    Plane,
    Ticket,
    Hotel,
    Utensils,
    ShoppingBag,
    MoreHorizontal,
    Plus,
    Pencil,
    Check,
    X,
} from "lucide-react";

interface ExpenseTableProps {
    data: CategorySummary[];
    currency?: string;
    onUpdateCategory?: (name: string, planned: number) => void;
    onAddExpense?: (categoryName: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
    car: <Car className="w-4 h-4" />,
    plane: <Plane className="w-4 h-4" />,
    ticket: <Ticket className="w-4 h-4" />,
    hotel: <Hotel className="w-4 h-4" />,
    utensils: <Utensils className="w-4 h-4" />,
    "shopping-bag": <ShoppingBag className="w-4 h-4" />,
    "more-horizontal": <MoreHorizontal className="w-4 h-4" />,
};

export function ExpenseTable({
    data,
    currency = "INR",
    onUpdateCategory,
    onAddExpense,
}: ExpenseTableProps) {
    const [editingRow, setEditingRow] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const totals = data.reduce(
        (acc, item) => ({
            planned: acc.planned + item.planned,
            actual: acc.actual + item.actual,
            difference: acc.difference + item.difference,
        }),
        { planned: 0, actual: 0, difference: 0 }
    );

    const handleEdit = (name: string, currentValue: number) => {
        setEditingRow(name);
        setEditValue(currentValue.toString());
    };

    const handleSave = (name: string) => {
        if (onUpdateCategory) {
            onUpdateCategory(name, parseFloat(editValue) || 0);
        }
        setEditingRow(null);
    };

    const handleCancel = () => {
        setEditingRow(null);
        setEditValue("");
    };

    return (
        <Card variant="glass" className="overflow-hidden">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                        Expenses
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/50">
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                                    Category
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                                    Planned
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                                    Actual
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                                    Diff.
                                </th>
                                <th className="w-12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Totals Row */}
                            <tr className="border-b-2 border-orange-500/30 bg-orange-500/5">
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                    Totals
                                </td>
                                <td className="py-3 px-4 text-right text-sm font-semibold text-foreground">
                                    {formatCurrency(totals.planned, currency)}
                                </td>
                                <td className="py-3 px-4 text-right text-sm font-semibold text-foreground">
                                    {formatCurrency(totals.actual, currency)}
                                </td>
                                <td
                                    className={cn(
                                        "py-3 px-4 text-right text-sm font-semibold",
                                        totals.difference >= 0 ? "text-emerald-500" : "text-red-500"
                                    )}
                                >
                                    {totals.difference >= 0 ? "" : "-"}
                                    {formatCurrency(Math.abs(totals.difference), currency)}
                                </td>
                                <td></td>
                            </tr>

                            {/* Category Rows */}
                            {data.map((item, index) => (
                                <tr
                                    key={item.name}
                                    className={cn(
                                        "border-b border-border/30 transition-colors hover:bg-accent/5",
                                        index % 2 === 0 ? "bg-transparent" : "bg-accent/5"
                                    )}
                                >
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: `${item.color}20` }}
                                            >
                                                <span style={{ color: item.color }}>
                                                    {iconMap[item.icon] || (
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    )}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-foreground">
                                                {item.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        {editingRow === item.name ? (
                                            <div className="flex items-center justify-end gap-1">
                                                <Input
                                                    type="number"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="w-24 h-8 text-right text-sm"
                                                    autoFocus
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-7 w-7"
                                                    onClick={() => handleSave(item.name)}
                                                >
                                                    <Check className="w-3 h-3 text-emerald-500" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-7 w-7"
                                                    onClick={handleCancel}
                                                >
                                                    <X className="w-3 h-3 text-red-500" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-end gap-1 group">
                                                <span className="text-sm text-muted-foreground">
                                                    {formatCurrency(item.planned, currency)}
                                                </span>
                                                {onUpdateCategory && (
                                                    <button
                                                        onClick={() => handleEdit(item.name, item.planned)}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent rounded"
                                                    >
                                                        <Pencil className="w-3 h-3 text-muted-foreground" />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-right text-sm font-medium text-foreground">
                                        {formatCurrency(item.actual, currency)}
                                    </td>
                                    <td
                                        className={cn(
                                            "py-3 px-4 text-right text-sm font-medium",
                                            item.difference >= 0 ? "text-emerald-500" : "text-red-500"
                                        )}
                                    >
                                        {item.difference >= 0 ? "" : "-"}
                                        {formatCurrency(Math.abs(item.difference), currency)}
                                    </td>
                                    <td className="py-3 px-4">
                                        {onAddExpense && (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-7 w-7 opacity-0 group-hover:opacity-100"
                                                onClick={() => onAddExpense(item.name)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}

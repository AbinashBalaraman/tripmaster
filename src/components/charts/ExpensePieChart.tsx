"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { CategorySummary } from "@/types";

interface ExpensePieChartProps {
    data: CategorySummary[];
    currency?: string;
}

const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
    "#6366F1",
    "#06B6D4",
];

export function ExpensePieChart({
    data,
    currency = "INR",
}: ExpensePieChartProps) {
    const pieData = data.map((item, index) => ({
        name: item.name,
        value: item.actual,
        color: item.color || COLORS[index % COLORS.length],
    }));

    const total = pieData.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const item = payload[0];
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
                <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.value, currency)}
                    </p>
                    <p className="text-sm font-medium" style={{ color: item.payload.color }}>
                        {percentage}%
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderCustomLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        name,
    }: any) => {
        if (percent < 0.05) return null;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                className="text-xs font-medium"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-full h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <defs>
                        {pieData.map((entry, index) => (
                            <linearGradient
                                key={`gradient-${index}`}
                                id={`gradient-${index}`}
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="1"
                            >
                                <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                                <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                            </linearGradient>
                        ))}
                    </defs>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomLabel}
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                    >
                        {pieData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={`url(#gradient-${index})`}
                                className="drop-shadow-lg transition-all duration-200 hover:opacity-80 cursor-pointer"
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        iconType="circle"
                        wrapperStyle={{ right: 0, top: "50%", transform: "translateY(-50%)" }}
                    />
                </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ marginLeft: "-40px" }}>
                <p className="text-xs text-muted-foreground text-center">Total Spent</p>
                <p className="text-lg font-bold text-foreground text-center">
                    {formatCurrency(total, currency)}
                </p>
            </div>
        </div>
    );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ACCOUNT_MODE_INFO, type AccountMode } from "@/types";
import { User, Users, Briefcase, Check } from "lucide-react";

interface TripModeSelectorProps {
    selected: AccountMode | null;
    onSelect: (mode: AccountMode) => void;
}

const iconMap = {
    user: User,
    users: Users,
    briefcase: Briefcase,
};

export function TripModeSelector({ selected, onSelect }: TripModeSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(ACCOUNT_MODE_INFO) as AccountMode[]).map((mode) => {
                const info = ACCOUNT_MODE_INFO[mode];
                const Icon = iconMap[info.icon as keyof typeof iconMap];
                const isSelected = selected === mode;

                return (
                    <Card
                        key={mode}
                        variant="glass"
                        className={cn(
                            "cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
                            isSelected
                                ? "ring-2 ring-blue-500 bg-blue-500/10"
                                : "hover:bg-accent/10"
                        )}
                        onClick={() => onSelect(mode)}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                        isSelected
                                            ? "bg-blue-500 text-white"
                                            : "bg-accent text-muted-foreground"
                                    )}
                                >
                                    <Icon className="w-6 h-6" />
                                </div>
                                {isSelected && (
                                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {info.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {info.description}
                            </p>

                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Best for:
                                </p>
                                <ul className="space-y-1">
                                    {info.examples.map((example) => (
                                        <li
                                            key={example}
                                            className="text-sm text-foreground/80 flex items-center gap-2"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-blue-500" />
                                            {example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

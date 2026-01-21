"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Map, Share2, Moon, Sun, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface NavbarProps {
    tripId?: string;
    tripName?: string;
}

export function Navbar({ tripId, tripName }: NavbarProps) {
    const { setTheme } = useTheme();
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-background/60 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo & Title */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-blue-500/25 transition-all">
                        <Map className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                            TripMaster
                        </span>
                        {tripName && (
                            <span className="text-xs text-muted-foreground font-medium truncate max-w-[150px]">
                                {tripName}
                            </span>
                        )}
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {tripId && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden md:flex gap-2"
                            onClick={copyLink}
                        >
                            {copied ? <Copy className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                            {copied ? "Copied!" : "Share Trip"}
                        </Button>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-9 h-9">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

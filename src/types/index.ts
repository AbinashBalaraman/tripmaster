// User account modes
export type AccountMode = "solo" | "group" | "full";

// Trip modes
export type TripMode = "solo" | "group";

// User profile
export interface Profile {
    id: string;
    displayName: string | null;
    avatarUrl: string | null;
    accountMode: AccountMode;
    createdAt: string;
}

// Trip
export interface Trip {
    id: string;
    name: string;
    description: string | null;
    startDate: string | null;
    endDate: string | null;
    totalBudget: number;
    currency: string;
    inviteCode: string | null;
    ownerId: string;
    tripMode: TripMode;
    createdAt: string;
}

// Trip member roles
export type MemberRole = "owner" | "member";

// Trip member
export interface TripMember {
    id: string;
    tripId: string;
    userId: string;
    role: MemberRole;
    joinedAt: string;
    profile?: Profile;
}

// Expense category
export interface ExpenseCategory {
    id: string;
    tripId: string;
    name: string;
    plannedAmount: number;
    icon: string | null;
    color: string | null;
    sortOrder: number;
}

// Expense
export interface Expense {
    id: string;
    tripId: string;
    categoryId: string;
    description: string;
    amount: number;
    paidBy: string;
    expenseDate: string;
    receiptUrl: string | null;
    createdAt: string;
    category?: ExpenseCategory;
    paidByProfile?: Profile;
}

// Expense split
export interface ExpenseSplit {
    id: string;
    expenseId: string;
    userId: string;
    shareAmount: number;
    isSettled: boolean;
    profile?: Profile;
}

// Packing item
export interface PackingItem {
    id: string;
    tripId: string;
    itemName: string;
    assignedTo: string | null;
    isPacked: boolean;
    category: string | null;
    assignedToProfile?: Profile;
}

// Timeline event types
export type EventType = "travel" | "activity" | "meal" | "stay" | "other";

// Timeline event
export interface TimelineEvent {
    id: string;
    tripId: string;
    title: string;
    description: string | null;
    eventDate: string;
    eventTime: string | null;
    location: string | null;
    eventType: EventType;
}

// Category expense summary (for charts)
export interface CategorySummary {
    name: string;
    planned: number;
    actual: number;
    difference: number;
    color: string;
    icon: string;
}

// Member balance (for splitting)
export interface MemberBalance {
    userId: string;
    displayName: string;
    avatarUrl: string | null;
    paid: number;
    owes: number;
    balance: number; // positive = owed money, negative = owes money
}

// Settlement suggestion
export interface Settlement {
    from: string;
    fromName: string;
    to: string;
    toName: string;
    amount: number;
}

// Default expense categories for new trips
export const DEFAULT_CATEGORIES = [
    { name: "Transportation", icon: "car", color: "#3B82F6" },
    { name: "Travel", icon: "plane", color: "#8B5CF6" },
    { name: "Activities", icon: "ticket", color: "#10B981" },
    { name: "Accommodation", icon: "hotel", color: "#F59E0B" },
    { name: "Food", icon: "utensils", color: "#EF4444" },
    { name: "Shopping", icon: "shopping-bag", color: "#EC4899" },
    { name: "Miscellaneous", icon: "more-horizontal", color: "#6B7280" },
];

// Account mode descriptions
export const ACCOUNT_MODE_INFO = {
    solo: {
        title: "Solo Mode",
        description: "Perfect for personal trip tracking. No sharing needed.",
        examples: ["Personal vacation", "Business trip", "Solo adventure"],
        icon: "user",
    },
    group: {
        title: "Group Mode",
        description:
            "Ideal for one-off trips with friends. Share via invite code.",
        examples: ["Boys Trip", "Bachelorette Party", "Family vacation"],
        icon: "users",
    },
    full: {
        title: "Full Account",
        description:
            "Best for frequent travelers. Manage multiple trips, persistent history.",
        examples: ["Travel Blogger", "Digital Nomad", "Travel Agency"],
        icon: "briefcase",
    },
};

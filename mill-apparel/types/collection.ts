// Collection Types

export interface Collection {
    id: string;
    name: string;
    slug: string;
    type: 'branch' | 'unit' | 'role' | 'gift';
    description: string;
    image?: string;
    icon?: string;
    parentBranch?: string; // For unit collections, references the parent branch ID
}

export type BranchCollection = 'army' | 'navy' | 'air-force' | 'marines' | 'coast-guard';
export type RoleCollection = 'eod' | 'infantry' | 'aviation' | 'medical' | 'mp' | 'sf' | 'engineering' | 'intelligence';
export type GiftCollection = 'retirement' | 'promotion' | 'pcs';

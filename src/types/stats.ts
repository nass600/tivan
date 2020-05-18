
export interface StatsDataItem {
    color: string;
    name: string;
    value: number;
    proportion: string;
}

export interface StatsTableInfo {
    headings: string[];
    items: StatsDataItem[];
}

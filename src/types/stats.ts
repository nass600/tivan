import { TableItem } from '@components'

export interface StatsDataItem extends TableItem {
    color: string;
    name: string;
    value: number;
    proportion: string;
}

export interface StatsTableInfo {
    headings: string[];
    items: StatsDataItem[];
}

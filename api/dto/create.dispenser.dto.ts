export interface CreateDispenserDto {
    id: string;
    flow_volume: number;
    pricePerLiter: number;
    status: string;
    updated_at?: Date;
    revenue?: number;
}
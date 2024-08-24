export interface Item {
    id:number,
    category_id:number,
    location_id:number,
    name:string,
    description:string,
    image:string,
    created_at:string;
}

export interface ItemMutation {
    category_id:number,
    location_id:number,
    name:string,
    description:string,
    image:string | null,
}
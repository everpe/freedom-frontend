export interface Corrals {
    corrals: Corral[];
}

export interface Corral {
    id?:            number;
    name:          string;
    capacity?:      number;
    created_at?:    Date;
    updated_at:    Date;
    animals_count?: number;
    animals?:       Animal[];
}

export interface Animal {
    id:            number;
    name:          string;
    dangerousness: string;
    age:           number;
    created_at:    Date;
    updated_at:    Date;
    corral_id:     number;
}

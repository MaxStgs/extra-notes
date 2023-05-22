export interface OnSaveNote {
    _id?: number;
    name: string;
    description: string;
}

export interface Note {
    _id: number;
    title: string;
    description: string;
    isDeleted?: boolean;
}
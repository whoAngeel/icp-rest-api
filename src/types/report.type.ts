export interface IImage{
    url: string
    description?: string
}

export interface ILocation{
    address?: string;
    lat: number,
    long: number
}

export interface IHistory{
    description: string
    date: Date
}

export interface IReport{
    id: string
    description: string
    images?: IImage[]
    status: 'pendiente' | 'en proceso' | 'resuelto',
    location: ILocation,
    createdAt: Date,
    history: IHistory[]
}
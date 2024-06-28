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
    date: Date,
    author: string

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

/*
// curl http://b77ix-eeaaa-aaaaa-qaada-cai.localhost:8000/reports
curl http://bw4dl-smaaa-aaaaa-qaacq-cai.localhost:8000/reports

*/
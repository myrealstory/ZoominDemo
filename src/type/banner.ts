export interface bannerProps {
    banner_id: string;
    id?: string;
    background?: string | ArrayBuffer | null;
    banner_url: string;
    country: string;
    banner_type: string;
    start_date: string;
    expire_date: string;
    banner_cat: number;
    banner_photo: string;
    status?: number;
    created?: string;
    modified?: string;
  }

export interface hashTagProps {
    en:string;
    zh:string;
}
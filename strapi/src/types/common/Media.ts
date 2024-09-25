// Interface automatically generated by schemas-to-ts

import { MediaFormat } from './MediaFormat';
    export interface Media {
      documentId: string;
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat; };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string;
      provider: string;
      createdAt: Date;
      updatedAt: Date;
    }
    export interface Media_Plain {
      id: number;
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat; };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string;
      provider: string;
      createdAt: Date;
      updatedAt: Date;
    }
    



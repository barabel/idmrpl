import type { RefObject } from 'react'

export type FCClass<P = object> = React.FC<P & React.PropsWithChildren & {
  className?: string,
}>;

export type TPlayerPreview = {
  preview?: {
    /** Адрес изображения */
    src: string
    /** Альт изображения */
    alt: string
  }
  onPlay?: () => void
}

export type TPlayerBaseMethods = {
  play: () => void
}

export type TPlayerBase = {
  ref: RefObject<TPlayerBaseMethods | null>
  url: string
}

export type TPlayer = {
  /** Превью для видео */
  preview?: TPlayerPreview['preview']
  /** Ссылка на видео */
  url: TPlayerBase['url']
};

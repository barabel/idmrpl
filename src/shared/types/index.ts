import type { RefObject } from 'react'

export type TPlayerPreview = {
  preview?: {
    src: string
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
  preview?: TPlayerPreview['preview']
  url: TPlayerBase['url']
};

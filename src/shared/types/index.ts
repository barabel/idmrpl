import type { RefObject } from 'react';

/** Утилитарный дженерик для обозначения функционального компонента с пропсами children и className */
export type FCClass<P = object> = React.FC<P & React.PropsWithChildren & { className?: string }>;

export type TPlayerPreview = {
  preview?: {
    /** Адрес изображения */
    src: string;
    /** Альт изображения */
    alt: string;
  };
  PreviewPictureComponent?: FCClass<Record<string, any>>;
  ButtonComponent?: FCClass<Record<string, any>>;
  onPlay?: () => void;
};

export type TPlayerBaseMethods = {
  play: () => void;
};

export type TPlayerBase = {
  ref: RefObject<TPlayerBaseMethods | null>;
  url: string;
};

type TMapComponents = {
  /** изображение превью */
  previewPicture: {
    /** компонент изображения */
    component: FCClass;
  };
  /** кнопка, которая отображаентся, когда видео загрузилось */
  button: {
    /** компонент кнопки */
    component: FCClass;
  };
  /** Плеер */
  player: {
    /** класс кнопки */
    className: string;
  };
};

type KeysWithComponent = {
  [K in keyof TMapComponents]: TMapComponents[K] extends { component: FCClass } ? K : never
}[keyof TMapComponents];

type TComponents = {
  [K in KeysWithComponent]?: TMapComponents[K]['component'];
};

type KeysWithClassNames = {
  [K in keyof TMapComponents]: TMapComponents[K] extends { className: string } ? K : never
}[keyof TMapComponents];

type TClassNames = {
  [K in KeysWithClassNames]?: TMapComponents[K]['className'];
};

export type TPlayer = {
  /** Превью для видео */
  preview?: TPlayerPreview['preview'];
  /** Ссылка на видео */
  url: TPlayerBase['url'];
  /** кастомные компоненты либы */
  components?: TComponents;
  /** кастомные классы для компонентов либы */
  classNames?: TClassNames;
};

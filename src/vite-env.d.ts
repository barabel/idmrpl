/// <reference types="vite/client" />

type FCClass<P = object> = React.FC<P & React.PropsWithChildren & {
  className?: string,
}>;

interface Window {
  YT?: any
  VK?: any;
  onYouTubeIframeAPIReady?: () => void
}

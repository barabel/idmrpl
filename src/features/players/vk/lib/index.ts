export const loadVKVideoApi = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Проверяем существование VK API
    if (window.VK?.VideoPlayer) {
      resolve(window.VK);
      return;
    }

    const vkScriptUrl = 'https://vk.com/js/api/videoplayer.js';
    const existingScript = Array.from(document.scripts).find(
      (script) => script.src === vkScriptUrl,
    );

    // Если скрипт уже добавлен, но API еще не доступно
    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (window.VK?.VideoPlayer) {
          clearInterval(checkInterval);
          resolve(window.VK);
        }
      }, 300);

      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('VK Video API timeout'));
      }, 15000);

      return;
    }

    // Создаем новый script элемент
    const script = document.createElement('script');
    script.src = vkScriptUrl;
    script.async = true;

    // Обработчик успешной загрузки
    script.onload = () => {
      // Дополнительная проверка, так как VK может требовать инициализацию
      const checkReady = () => {
        if (window.VK?.VideoPlayer) {
          resolve(window.VK);
        } else {
          setTimeout(checkReady, 300);
        }
      };
      checkReady();
    };

    // Обработчик ошибок
    script.onerror = () => {
      reject(new Error('Failed to load VK Video API'));
    };

    // Добавляем скрипт в DOM
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  });
};

export const convertVkVideoLink = (url: string): string => {
  const regex = /^https:\/\/vkvideo\.ru\/video(-\d+)_(\d+)$/;
  const match = url.match(regex);

  if (!match) {
    throw new Error(`Некорректный формат ссылки ${url}`);
  }

  const oid = match[1];
  const id = match[2];

  return `https://vkvideo.ru/video_ext.php?oid=${oid}&id=${id}`;
}

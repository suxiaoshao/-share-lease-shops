/**
 * 初始化 canvas
 * @param canvas canvas 对象
 * @param width 图片宽度
 * @param height 图片高度
 * */
export function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number): CanvasRenderingContext2D | null {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width / dpr;
  canvas.height = height / dpr;
  const rect = canvas.getBoundingClientRect();
  canvas.width = (rect.width || canvas.width) * dpr;
  canvas.height = (rect.height || canvas.height) * dpr;
  return canvas.getContext('2d');
}

export function getFileFromUrl(url: string): Promise<File> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      const context = setupCanvas(canvas, image.width, image.height);
      if (context !== null) {
        context?.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          if (blob !== null) {
            resolve(new File([blob], 'file.png', { type: 'image/png' }));
          } else {
            reject(new Error('图片读取失败'));
          }
        });
      } else {
        reject(new Error('图片读取失败'));
      }
    });
  });
}

declare global {
  interface Window {
    QRCode?: any;
  }
}

export function renderQRCodeToElement(
  container: HTMLElement,
  text: string,
  options: {
    width?: number;
    height?: number;
    colorDark?: string;
    colorLight?: string;
  } = {}
): void {
  container.innerHTML = '';
  const {
    width = 200,
    height = 200,
    colorDark = '#12324a',
    colorLight = '#f4eedc',
  } = options;

  if (window.QRCode) {
    new window.QRCode(container, {
      text,
      width,
      height,
      colorDark,
      colorLight,
      correctLevel: 2, // M
    });
  } else {
    // If QRCode is not loaded from CDN yet, provide an informative placeholder
    const errDiv = document.createElement('div');
    errDiv.style.cssText = 'color:#12324a;font-size:12px;padding:20px;text-align:center;';
    errDiv.textContent = '二维码组件加载中或离线不可用，请直接复制下方密钥使用。';
    container.appendChild(errDiv);
  }
}

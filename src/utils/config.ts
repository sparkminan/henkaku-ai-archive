export const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/henkaku-ai-archive' : '';
};

export const getImagePath = (path: string) => {
  const basePath = getBasePath();
  return `${basePath}${path}`;
};
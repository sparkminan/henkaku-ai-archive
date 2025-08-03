export const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/henkaku-ai-archive' : '';
};

export const getImagePath = (path: string) => {
  // If the path is already a full URL, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const basePath = getBasePath();
  return `${basePath}${path}`;
};
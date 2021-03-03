import { httpPost } from './main';

export async function upload(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  return await httpPost<FormData, string>('/upload', formData);
}

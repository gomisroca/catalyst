import supabase from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { checkFileType, checkFileSize } from '@/utils/upload-checks';

async function getToken(id: string, bucket: string) {
  const { data } = await supabase.storage.from(bucket).createSignedUploadUrl(`${id}.png`);
  return data?.token;
}

export async function uploadImage(file: File, bucket = 'avatars'): Promise<string | null> {
  try {
    const isImage = checkFileType(file);
    if (!isImage) {
      return null;
    }
    const isRightSize = checkFileSize(file);
    if (!isRightSize) {
      return null;
    }

    const id = uuidv4();
    const token = await getToken(id, bucket);
    if (token) {
      const { data } = await supabase.storage.from(bucket).uploadToSignedUrl(`${id}.png`, token, file);
      if (data) {
        return data?.fullPath;
      }
    }

    return null;
  } catch (_error) {
    throw new Error('Failed to upload image');
  }
}

async function fetchImageAsBlob(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    return await response.blob();
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}

export async function uploadImageFromUrl(imageUrl: string, bucket: string = 'avatars') {
  try {
    // Generate a unique ID for the file
    const id = uuidv4();

    // Fetch the image as a blob
    const blob = await fetchImageAsBlob(imageUrl);

    // Create a File object
    const file = new File([blob], `${id}.png`, { type: 'image/png' });
    const isImage = checkFileType(file);
    if (!isImage) {
      return null;
    }
    const isRightSize = checkFileSize(file);
    if (!isRightSize) {
      return null;
    }

    // Get signed upload token
    const token = await getToken(id, bucket);

    if (token) {
      // Upload to Supabase storage
      const { data, error } = await supabase.storage.from(bucket).uploadToSignedUrl(`${id}.png`, token, file);

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      return data?.fullPath || null;
    }

    return null;
  } catch (error) {
    console.error('Failed to upload image from URL:', error);
    throw new Error('Failed to upload image from URL');
  }
}

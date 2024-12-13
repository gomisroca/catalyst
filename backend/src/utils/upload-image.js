import supabase from './supabase.js';
import { v4 as uuidv4 } from 'uuid';
import { checkFileType, checkFileSize } from './upload-checks.js';

async function getToken(id, bucket) {
  const { data } = await supabase.storage.from(bucket).createSignedUploadUrl(`${id}.png`);
  return data?.token;
}

async function convertBase64ToFile(dataUrl, id) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], id + '.png', { type: 'image/png' });
}

export async function uploadImage(image, bucket = 'avatars') {
  try {
    const id = uuidv4();
    const file = await convertBase64ToFile(image, id);
    const isImage = checkFileType(file);
    if (!isImage) {
      return null;
    }
    const isRightSize = checkFileSize(file);
    if (!isRightSize) {
      return null;
    }

    const token = await getToken(id, bucket);
    if (token) {
      const { data } = await supabase.storage.from(bucket).uploadToSignedUrl(`${id}.png`, token, file);
      if (data) {
        return data?.fullPath;
      }
    }
  } catch (_error) {
    throw new Error('Failed to upload image');
  }
}

async function fetchImageAsBlob(url) {
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

export async function uploadImageFromUrl(imageUrl, bucket = 'avatars') {
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

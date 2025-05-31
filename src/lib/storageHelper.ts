import { supabase } from './supabase';

interface UploadFileOptions {
  bucket: string;
  path: string;
  file: File;
  upsert?: boolean;
}

export async function uploadFile({
  bucket,
  path,
  file,
  upsert = true,
}: UploadFileOptions) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert });

    if (error) {
      console.error('Upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    console.log('Upload successful:', data);
    return data;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

export async function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

interface UploadProfileImageOptions {
  userId: string;
  file: File;
}

export async function uploadProfileImage({
  userId,
  file,
}: UploadProfileImageOptions): Promise<string> {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;

    // Upload the file
    await uploadFile({
      bucket: 'profile-images',
      path: fileName,
      file,
      upsert: true,
    });

    // Get the public URL
    const publicUrl = await getPublicUrl('profile-images', fileName);

    console.log('Profile image uploaded successfully:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    if (error instanceof Error) {
      if (error.message.includes('row-level security policy')) {
        throw new Error(
          'Storage permission denied. Please make sure the storage bucket policies are properly configured.'
        );
      }
    }
    throw error;
  }
}

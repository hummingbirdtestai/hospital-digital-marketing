import { supabase } from '../services/supabaseClient.js';

export async function uploadProof(taskId, fileBuffer, fileName, mimeType) {
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(\proofs/${taskId}/${fileName}\, fileBuffer, {
      contentType: mimeType
    });

  if (error) throw error;
  return data.path;
}

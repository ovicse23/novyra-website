export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function uploadPaymentProof(
  r2: R2Bucket,
  orderId: string,
  file: File
): Promise<string> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('Screenshot file size exceeds 5MB limit.');
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPG, PNG, and WEBP are permitted.');
  }

  const extMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };
  const ext = extMap[file.type] || 'jpg';
  const objectKey = `proofs/${orderId.toLowerCase()}-${Date.now()}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();

  await r2.put(objectKey, arrayBuffer, {
    httpMetadata: {
      contentType: file.type,
    },
    customMetadata: {
      orderId,
      uploadedAt: new Date().toISOString(),
    },
  });

  return objectKey;
}

export async function getPaymentProof(
  r2: R2Bucket,
  objectKey: string
): Promise<{ body: ReadableStream | ArrayBuffer | null; contentType: string } | null> {
  const object = await r2.get(objectKey);
  if (!object) return null;

  return {
    body: object.body,
    contentType: object.httpMetadata?.contentType || 'image/jpeg',
  };
}

export async function getProductPdf(
  r2: R2Bucket,
  key: string = 'products/novyra-ai-client-hunting-toolkit.pdf'
): Promise<{ body: ReadableStream | ArrayBuffer | null; size?: number } | null> {
  const object = await r2.get(key);
  if (object) {
    return {
      body: object.body,
      size: object.size,
    };
  }
  return null;
}

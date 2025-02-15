export async function processFile(file: File): Promise<string> {
  if (!file) throw new Error('No file provided');
  
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('File size exceeds 10MB limit');
  }

  const validTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a TXT, PDF, or DOCX file.');
  }

  if (file.type === 'text/plain') {
    return await file.text();
  }

  // For PDF and DOCX, we'll need to implement server-side processing
  // For now, throw an informative error
  throw new Error('PDF and DOCX support coming soon. Please paste text directly or use a TXT file.');
}

export async function fetchUrlContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch URL content');
    }
    const text = await response.text();
    
    // Basic HTML to text conversion
    const doc = new DOMParser().parseFromString(text, 'text/html');
    // Remove scripts, styles, and other non-content elements
    const scripts = doc.getElementsByTagName('script');
    const styles = doc.getElementsByTagName('style');
    [...scripts, ...styles].forEach(element => element.remove());
    
    // Get text content from body
    const content = doc.body.textContent || '';
    const cleaned = content.replace(/\s+/g, ' ').trim();
    
    if (cleaned.length < 100) {
      throw new Error('URL content is too short or empty');
    }
    
    return cleaned;
  } catch (error) {
    throw new Error('Failed to extract content from URL. Please try pasting the text directly.');
  }
}
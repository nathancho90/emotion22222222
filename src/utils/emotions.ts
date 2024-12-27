export function detectEmotion(text: string): 'happy' | 'sad' | 'neutral' | 'thinking' {
  const lowerText = text.toLowerCase();
  
  if (lowerText.match(/(\b|^)(happy|joy|great|awesome|excellent)(\b|$)/)) {
    return 'happy';
  }
  
  if (lowerText.match(/(\b|^)(sad|sorry|unfortunate|bad)(\b|$)/)) {
    return 'sad';
  }
  
  if (lowerText.match(/(\b|^)(think|consider|analyze|process)(\b|$)/)) {
    return 'thinking';
  }
  
  return 'neutral';
}
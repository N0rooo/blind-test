export function cleanData(title: string) {
  // Define unwanted keywords and patterns
  const unwantedKeywords = [
    "feat\\.?|ft\\.?", "remix", "remastered", "color show",
    "live", "version", "edit", "cover", "demo", "acoustic",
    "nouvelle école", "nouvelle ecole"
  ];

  // Create a regex pattern to remove unwanted keywords
  const pattern = new RegExp(`\\s*(${unwantedKeywords.join('|')}).*`, 'gi');
  let mainTitle = title.replace(pattern, "").trim();

  // Remove accents
  mainTitle = mainTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove punctuation (including apostrophes), but keep hyphens within words
  mainTitle = mainTitle.replace(/(?<!\w)[^\w\s-]+|[^\w\s-]+(?!\w)/g, "");

  // Transform to lowercase
  mainTitle = mainTitle.toLowerCase();

  // Check and split the title on hyphens with spaces around them
  const splitTitle = mainTitle.split(/\s-\s/);
  mainTitle = splitTitle[0].trim();

  mainTitle = mainTitle.replace(/\s+/g, "");


  return mainTitle;
}
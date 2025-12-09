/**
 * API route to fetch live Harley listings from joesusedharleys.com
 * Caches results for 5 minutes to avoid excessive requests
 */

interface Harley {
  id: string;
  name: string;
  year: number;
  model: string;
  price: number;
  image: string;
  mileage?: number;
  url?: string;
  description?: string;
}

// Cache for bike listings
let cachedBikes: Harley[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchBikesFromSite(): Promise<Harley[]> {
  try {
    const response = await fetch('https://joesusedharleys.com', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GuerrillaSocialClub/1.0)',
      },
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse HTML to extract bike listings
    // This is a basic parser - adjust selectors based on actual site structure
    const bikes: Harley[] = [];
    
    // Try to find bike listings in the HTML
    // Common patterns: data attributes, class names, JSON-LD, etc.
    
    // Method 1: Look for JSON-LD structured data
    const jsonLdMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is);
    if (jsonLdMatch) {
      try {
        const jsonLd = JSON.parse(jsonLdMatch[1]);
        if (Array.isArray(jsonLd)) {
          jsonLd.forEach((item: Record<string, unknown>, index: number) => {
            const itemType = item['@type'];
            if (itemType === 'Product' || itemType === 'Vehicle') {
              const identifier = typeof item.identifier === 'string' ? item.identifier : `bike-${index}`;
              const name = (typeof item.name === 'string' ? item.name : 'Harley-Davidson') || 
                          ((item.brand as Record<string, unknown>)?.name as string) || 
                          'Harley-Davidson';
              const productionDate = item.productionDate || item.releaseDate;
              const year = typeof productionDate === 'string' ? parseInt(productionDate.substring(0, 4)) : 
                          typeof productionDate === 'number' ? productionDate : 
                          new Date().getFullYear() - 2;
              const model = (typeof item.model === 'string' ? item.model : '') || 
                           (typeof item.name === 'string' ? item.name : '');
              const offers = item.offers as Record<string, unknown> | undefined;
              const price = typeof offers?.price === 'number' ? offers.price :
                           typeof item.price === 'number' ? item.price : 0;
              const imageArray = Array.isArray(item.image) ? item.image : 
                                 typeof item.image === 'string' ? [item.image] : [];
              const image = (imageArray[0] as string) || 'https://files.catbox.moe/harley-placeholder.jpg';
              const mileageObj = item.mileageFromOdometer as Record<string, unknown> | undefined;
              const mileage = typeof mileageObj?.value === 'number' ? mileageObj.value : undefined;
              const url = (typeof item.url === 'string' ? item.url : undefined) || 
                         `https://joesusedharleys.com/bike-${index}`;
              const description = typeof item.description === 'string' ? item.description : undefined;
              
              bikes.push({
                id: identifier,
                name,
                year,
                model,
                price,
                image,
                mileage,
                url,
                description,
              });
            }
          });
        }
      } catch (e) {
        console.error('Failed to parse JSON-LD:', e);
      }
    }

    // Method 2: Look for common HTML patterns (adjust selectors as needed)
    // This is a fallback if JSON-LD isn't available
    if (bikes.length === 0) {
      // Try to find bike cards/items in the HTML
      // Adjust these selectors based on actual site structure
      const bikeCardPattern = /<div[^>]*class=["'][^"']*bike[^"']*["'][^>]*>(.*?)<\/div>/gis;
      const matches = html.matchAll(bikeCardPattern);
      
      let index = 0;
      for (const match of matches) {
        if (index >= 20) break; // Limit to 20 bikes
        
        const cardHtml = match[1];
        
        // Extract price
        const priceMatch = cardHtml.match(/\$([\d,]+)/);
        const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0;
        
        // Extract year
        const yearMatch = cardHtml.match(/(\d{4})\s/);
        const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear() - 2;
        
        // Extract image
        const imgMatch = cardHtml.match(/<img[^>]*src=["']([^"']+)["']/i);
        const image = imgMatch ? imgMatch[1] : 'https://files.catbox.moe/harley-placeholder.jpg';
        
        // Extract title/name
        const titleMatch = cardHtml.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i) || 
                          cardHtml.match(/<a[^>]*>(.*?)<\/a>/i);
        const name = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : 'Harley-Davidson';
        
        if (price > 0) {
          bikes.push({
            id: `bike-${index}`,
            name: name.substring(0, 50),
            year,
            model: name,
            price,
            image: image.startsWith('http') ? image : `https://joesusedharleys.com${image}`,
            url: `https://joesusedharleys.com`,
          });
          index++;
        }
      }
    }

    // If still no bikes found, return empty array (will use fallback)
    return bikes.length > 0 ? bikes : [];
  } catch (error) {
    console.error('Error fetching bikes from joesusedharleys.com:', error);
    return [];
  }
}

export async function GET() {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedBikes && (now - cacheTimestamp) < CACHE_DURATION) {
      return Response.json({ bikes: cachedBikes, cached: true });
    }

    // Fetch fresh data
    const bikes = await fetchBikesFromSite();
    
    // Update cache
    cachedBikes = bikes;
    cacheTimestamp = now;

    // If no bikes found, return fallback mock data
    if (bikes.length === 0) {
      const fallbackBikes: Harley[] = [
        {
          id: '1',
          name: 'Street Glide',
          year: 2020,
          model: 'FLHX',
          price: 18999,
          image: 'https://files.catbox.moe/harley-1.jpg',
          mileage: 8500,
          url: 'https://joesusedharleys.com',
        },
        {
          id: '2',
          name: 'Sportster',
          year: 2019,
          model: 'XL883',
          price: 8999,
          image: 'https://files.catbox.moe/harley-2.jpg',
          mileage: 12000,
          url: 'https://joesusedharleys.com',
        },
        {
          id: '3',
          name: 'Fat Boy',
          year: 2021,
          model: 'FLFB',
          price: 21999,
          image: 'https://files.catbox.moe/harley-3.jpg',
          mileage: 3500,
          url: 'https://joesusedharleys.com',
        },
        {
          id: '4',
          name: 'Road King',
          year: 2018,
          model: 'FLHR',
          price: 16999,
          image: 'https://files.catbox.moe/harley-4.jpg',
          mileage: 15000,
          url: 'https://joesusedharleys.com',
        },
      ];
      
      return Response.json({ bikes: fallbackBikes, cached: false, fallback: true });
    }

    return Response.json({ bikes, cached: false });
  } catch (error) {
    console.error('Error in harleys API route:', error);
    return Response.json(
      { error: 'Failed to fetch bikes', bikes: [] },
      { status: 500 }
    );
  }
}


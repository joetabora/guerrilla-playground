/**
 * API route to fetch live Harley listings from Airtable
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

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableResponse {
  records: AirtableRecord[];
}

// Cache for bike listings
let cachedBikes: Harley[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchBikesFromAirtable(): Promise<Harley[]> {
  // Base ID and Table ID extracted from your Airtable URL
  // URL: https://airtable.com/appxmWmvzuo3igvMI/tbllZuEMGdoV48WVg/...
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appxmWmvzuo3igvMI';
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  // Can use either table name or table ID (tbllZuEMGdoV48WVg)
  const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_NAME || 'tbllZuEMGdoV48WVg';

  if (!AIRTABLE_API_KEY) {
    console.log('Airtable API key not configured');
    return [];
  }

  try {
    // Try with table ID first, then fallback to common table names
    const tableOptions = [
      AIRTABLE_TABLE, // Use provided table ID/name
      'Inventory',
      'Bikes',
      'Vehicles',
      'Harleys',
    ];

    for (const table of tableOptions) {
      try {
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`;
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (response.ok) {
          const data = await response.json() as AirtableResponse;
          
          if (data.records && data.records.length > 0) {
            console.log(`✅ Successfully fetched ${data.records.length} bikes from Airtable table: ${table}`);
            // Success! Process the records
            return data.records.map((record) => {
              const fields = record.fields;
              
              // Map Airtable fields to our Harley interface
              // Adjust field names based on your Airtable column names
              const name = typeof fields.Name === 'string' ? fields.Name :
                           typeof fields['Bike Name'] === 'string' ? fields['Bike Name'] :
                           typeof fields.Model === 'string' ? fields.Model :
                           typeof fields.Title === 'string' ? fields.Title :
                           'Harley-Davidson';
              
              // Extract year from name if it starts with a year (e.g., "2005 Harley-Davidson...")
              let year = typeof fields.Year === 'number' ? fields.Year :
                         typeof fields.Year === 'string' ? parseInt(fields.Year) :
                         typeof fields['Model Year'] === 'number' ? fields['Model Year'] :
                         typeof fields['Model Year'] === 'string' ? parseInt(fields['Model Year']) :
                         undefined;
              
              // If year not found in fields, try to extract from name
              if (!year && typeof name === 'string') {
                const yearMatch = name.match(/^(\d{4})/);
                if (yearMatch) {
                  year = parseInt(yearMatch[1]);
                }
              }
              
              // Fallback to current year - 2 if still no year
              if (!year || isNaN(year)) {
                year = new Date().getFullYear() - 2;
              }
              
              const model = typeof fields.Model === 'string' ? fields.Model :
                            typeof fields['Model Name'] === 'string' ? fields['Model Name'] :
                            name;
              
              const price = typeof fields.Price === 'number' ? fields.Price :
                             typeof fields['Sale Price'] === 'number' ? fields['Sale Price'] :
                             typeof fields.Price === 'string' ? parseInt(fields.Price.replace(/[^0-9]/g, '')) : 0;
              
              const image = typeof fields.Image === 'string' ? fields.Image :
                             Array.isArray(fields.Images) && fields.Images.length > 0 ? String(fields.Images[0]) :
                             typeof fields.Photo === 'string' ? fields.Photo :
                             'https://files.catbox.moe/harley-placeholder.jpg';
              
              const mileage = typeof fields.Mileage === 'number' ? fields.Mileage :
                               typeof fields.Miles === 'number' ? fields.Miles :
                               typeof fields.Mileage === 'string' ? parseInt(fields.Mileage.replace(/[^0-9]/g, '')) : undefined;
              
              const url = typeof fields.URL === 'string' ? fields.URL :
                           typeof fields.Link === 'string' ? fields.Link :
                           `https://joesusedharleys.com`;
              
              return {
                id: record.id,
                name,
                year,
                model,
                price,
                image: Array.isArray(image) ? String(image[0]) : image,
                mileage,
                url,
                description: typeof fields.Description === 'string' ? fields.Description : undefined,
              };
            });
          }
        } else if (response.status === 403) {
          const errorText = await response.text().catch(() => '');
          console.log(`❌ Access denied (403) for table: ${table}`);
          console.log(`   Error details: ${errorText.substring(0, 200)}`);
          console.log(`   Make sure your API token has access to base ${AIRTABLE_BASE_ID}`);
          continue; // Try next table name
        } else if (response.status === 404) {
          console.log(`⚠️  Table not found (404): ${table}. Trying next option...`);
          continue; // Try next table name
        } else {
          const errorText = await response.text().catch(() => '');
          console.log(`❌ Airtable API error ${response.status} for table ${table}: ${errorText.substring(0, 200)}`);
          throw new Error(`Airtable API error: ${response.status} for table ${table}`);
        }
      } catch (tableError) {
        // Try next table option
        if (table === tableOptions[tableOptions.length - 1]) {
          // Last option failed, throw the error
          throw tableError;
        }
        continue;
      }
    }
    
    // If we get here, none of the tables worked
    return [];
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return [];
  }
}

async function fetchBikesFromSite(): Promise<Harley[]> {
  try {
    // Try multiple common API endpoint patterns for Next.js inventory
    const apiEndpoints = [
      'https://joesusedharleys.com/api/inventory',
      'https://joesusedharleys.com/api/bikes',
      'https://joesusedharleys.com/api/vehicles',
      'https://joesusedharleys.com/inventory.json',
      'https://joesusedharleys.com/data/inventory.json',
      'https://joesusedharleys.com/data/bikes.json',
    ];

    for (const endpoint of apiEndpoints) {
      try {
        const apiResponse = await fetch(endpoint, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; GuerrillaSocialClub/1.0)',
            'Accept': 'application/json',
          },
          next: { revalidate: 300 },
        });
        
        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          
          // Handle different response formats
          let bikesArray: unknown[] = [];
          if (Array.isArray(apiData)) {
            bikesArray = apiData;
          } else if (apiData && typeof apiData === 'object' && 'bikes' in apiData && Array.isArray(apiData.bikes)) {
            bikesArray = apiData.bikes;
          } else if (apiData && typeof apiData === 'object' && 'inventory' in apiData && Array.isArray(apiData.inventory)) {
            bikesArray = apiData.inventory;
          } else if (apiData && typeof apiData === 'object' && 'data' in apiData && Array.isArray(apiData.data)) {
            bikesArray = apiData.data;
          }
          
          if (bikesArray.length > 0) {
            return bikesArray.map((bike, index) => {
              const bikeData = bike as Record<string, unknown>;
              return {
                id: typeof bikeData.id === 'string' ? bikeData.id : 
                    typeof bikeData._id === 'string' ? bikeData._id :
                    `bike-${index}`,
                name: typeof bikeData.name === 'string' ? bikeData.name : 
                      typeof bikeData.title === 'string' ? bikeData.title :
                      typeof bikeData.model === 'string' ? bikeData.model :
                      'Harley-Davidson',
                year: typeof bikeData.year === 'number' ? bikeData.year : 
                      typeof bikeData.year === 'string' ? parseInt(bikeData.year) :
                      new Date().getFullYear() - 2,
                model: typeof bikeData.model === 'string' ? bikeData.model : 
                       typeof bikeData.name === 'string' ? bikeData.name : '',
                price: typeof bikeData.price === 'number' ? bikeData.price : 
                       typeof bikeData.price === 'string' ? parseInt(bikeData.price.replace(/[^0-9]/g, '')) : 0,
                image: typeof bikeData.image === 'string' ? bikeData.image : 
                       typeof bikeData.photo === 'string' ? bikeData.photo :
                       Array.isArray(bikeData.images) && bikeData.images.length > 0 ? String(bikeData.images[0]) :
                       'https://files.catbox.moe/harley-placeholder.jpg',
                mileage: typeof bikeData.mileage === 'number' ? bikeData.mileage : 
                         typeof bikeData.miles === 'number' ? bikeData.miles :
                         typeof bikeData.mileage === 'string' ? parseInt(bikeData.mileage.replace(/[^0-9]/g, '')) : undefined,
                url: typeof bikeData.url === 'string' ? bikeData.url : 
                     typeof bikeData.link === 'string' ? bikeData.link :
                     typeof bikeData.slug === 'string' ? `https://joesusedharleys.com/${bikeData.slug}` :
                     'https://joesusedharleys.com',
              };
            });
          }
        }
      } catch {
        // Try next endpoint
        continue;
      }
    }

    // Fallback to HTML parsing
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
    // Note: joesusedharleys.com is a Next.js app that loads inventory client-side
    // HTML parsing won't work. Need API endpoint or manual data entry.
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

    // Try Airtable first (if configured)
    let bikes = await fetchBikesFromAirtable();
    
    // If Airtable didn't return bikes, try other methods
    if (bikes.length === 0) {
      bikes = await fetchBikesFromSite();
    }
    
    // Update cache
    cachedBikes = bikes;
    cacheTimestamp = now;

    // If no bikes found, try to load from local data file
    if (bikes.length === 0) {
      try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const dataPath = path.join(process.cwd(), 'data', 'harleys.json');
        const fileData = await fs.readFile(dataPath, 'utf-8');
        const localBikes = JSON.parse(fileData) as Harley[];
        
        if (localBikes.length > 0) {
          return Response.json({ bikes: localBikes, cached: false, source: 'local' });
        }
      } catch {
        // If file doesn't exist or can't be read, use hardcoded fallback
      }
      
      // Hardcoded fallback
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


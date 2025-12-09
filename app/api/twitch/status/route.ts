/**
 * API route to check Twitch live status and get latest VOD
 */
export async function GET() {
  const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
  const CHANNEL_NAME = 'suchgrime';

  try {
    // Get access token
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: TWITCH_CLIENT_ID || '',
        client_secret: TWITCH_CLIENT_SECRET || '',
        grant_type: 'client_credentials',
      }),
    });

    if (!tokenResponse.ok) {
      // Return mock data if no credentials
      return Response.json({
        isLive: false,
        vodId: null,
        channelName: CHANNEL_NAME,
      });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user ID
    const userResponse = await fetch(
      `https://api.twitch.tv/helix/users?login=${CHANNEL_NAME}`,
      {
        headers: {
          'Client-ID': TWITCH_CLIENT_ID || '',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      return Response.json({
        isLive: false,
        vodId: null,
        channelName: CHANNEL_NAME,
      });
    }

    const userData = await userResponse.json();
    const userId = userData.data[0]?.id;

    if (!userId) {
      return Response.json({
        isLive: false,
        vodId: null,
        channelName: CHANNEL_NAME,
      });
    }

    // Check if live
    const streamResponse = await fetch(
      `https://api.twitch.tv/helix/streams?user_id=${userId}`,
      {
        headers: {
          'Client-ID': TWITCH_CLIENT_ID || '',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const streamData = await streamResponse.json();
    const isLive = streamData.data && streamData.data.length > 0;

    // Get latest VOD if not live
    let vodId = null;
    if (!isLive) {
      const vodResponse = await fetch(
        `https://api.twitch.tv/helix/videos?user_id=${userId}&first=1&type=archive`,
        {
          headers: {
            'Client-ID': TWITCH_CLIENT_ID || '',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const vodData = await vodResponse.json();
      vodId = vodData.data?.[0]?.id || null;
    }

    return Response.json({
      isLive,
      vodId,
      channelName: CHANNEL_NAME,
    });
  } catch (error) {
    console.error('Twitch API error:', error);
    return Response.json({
      isLive: false,
      vodId: null,
      channelName: CHANNEL_NAME,
    });
  }
}


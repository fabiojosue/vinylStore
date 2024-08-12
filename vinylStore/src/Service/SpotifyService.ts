import axios, { AxiosRequestConfig } from 'axios';

/**
 * Service for interacting with the Spotify API.
 * Handles authentication and various Spotify endpoints.
 */
class SpotifyService {
  private clientId: string = '691d103193dd49c5a81de3fd5bb7bc21';
  private clientSecret: string = '0f020fd39f9d44b4bf4ea4f28265c836';
  private tokenUrl: string = 'https://accounts.spotify.com/api/token';
  private idAndSecret: string = btoa(this.clientId + ':' + this.clientSecret); // Base64 encoded client ID and secret
  private token: string = '';

  /**
   * Fetches an access token from Spotify.
   * @returns {Promise<string>} The access token as a string.
   */
  private async getAccessToken(): Promise<string> {
    const body = 'grant_type=client_credentials';
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: 'Basic ' + this.idAndSecret,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await axios.post(this.tokenUrl, body, options);
      this.token = response.data.access_token;
      return this.token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return '';
    }
  }

  /**
   * Retrieves new releases from Spotify.
   * @returns {Promise<any>} The new releases data or null if an error occurs.
   */
  async getNewReleases(): Promise<any> {
    const releasesUrl = 'https://api.spotify.com/v1/browse/new-releases';

    const token = await this.getAccessToken();
    if (!token) return null;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get<any>(releasesUrl, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching new releases:', error);
      return null;
    }
  }

  /**
   * Retrieves the top tracks for a given artist from Spotify.
   * @param {string} artistId The ID of the artist.
   * @returns {Promise<any>} The top tracks data or null if an error occurs.
   */
  async getTopTracks(artistId: string): Promise<any> {
    const topTracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=CR`;

    const token = await this.getAccessToken();
    if (!token) return null;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get<any>(topTracksUrl, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      return null;
    }
  }

  /**
   * Retrieves information about a specific artist from Spotify.
   * @param {string} artistId The ID of the artist.
   * @returns {Promise<any>} The artist data or null if an error occurs.
   */
  async getArtist(artistId: string): Promise<any> {
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;

    const token = await this.getAccessToken();
    if (!token) return null;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get<any>(artistUrl, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching artist:', error);
      return null;
    }
  }

  /**
   * Retrieves albums based on search criteria from Spotify.
   * @param {string} type The type of search (e.g., 'album', 'track').
   * @param {string} query The search query.
   * @param {string} market The market code (e.g., 'US').
   * @param {number} limit The number of results to return.
   * @param {number} offset The offset for pagination.
   * @returns {Promise<any>} The albums data or null if an error occurs.
   */
  async getAlbums(
    type: string,
    query: string,
    market: string,
    limit: number,
    offset: number
  ): Promise<any> {
    const albumsUrl = 'https://api.spotify.com/v1/search';
    const params = {
      type,
      q: query,
      market,
      limit: limit.toString(),
      offset: offset.toString(),
    };

    const token = await this.getAccessToken();
    if (!token) return null;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get<any>(albumsUrl, { headers, params });
      return response.data;
    } catch (error) {
      console.error('Error fetching albums:', error);
      return null;
    }
  }

  /**
   * Retrieves information about a specific album from Spotify.
   * @param {string} albumId The ID of the album.
   * @returns {Promise<any>} The album data or null if an error occurs.
   */
  async getAlbum(albumId: string): Promise<any> {
    const albumUrl = `https://api.spotify.com/v1/albums/${albumId}`;

    const token = await this.getAccessToken();
    if (!token) return null;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get<any>(albumUrl, { headers });
      console.log("albumDatasasa",response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching album:', error);
      return null;
    }
  }

  /**
   * Performs a search query on Spotify.
   * @param {string} type The type of search (e.g., 'album', 'track').
   * @param {string} query The search query.
   * @param {number} limit The number of results to return.
   * @param {string} [market] Optional market code (e.g., 'US').
   * @param {number} [offset] Optional offset for pagination.
   * @returns {Promise<any>} The search results or null if an error occurs.
   */
  async search(
    type: string,
    query: string,
    limit: number,
    market?: string,
    offset?: number
  ): Promise<any> {
    const searchUrl = 'https://api.spotify.com/v1/search';
    const params = {
      type,
      q: query,
      market,
      limit: limit.toString(),
      offset: offset?.toString(),
    };

    const token = await this.getAccessToken();
    if (!token) return null;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get<any>(searchUrl, { headers, params });
      return response.data;
    } catch (error) {
      console.error('Error searching tracks:', error);
      return null;
    }
  }
}

export default new SpotifyService();

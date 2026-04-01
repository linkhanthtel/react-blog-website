// API service for backend communication
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'https://wanderluxe-ventures.onrender.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Get headers for API requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let detail = errorData.detail;
        if (Array.isArray(detail)) {
          detail = detail.map((e) => e.msg || JSON.stringify(e)).join(' ');
        }
        throw new Error(detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    this.setToken(data.access_token);
    return data;
  }

  async register(username, email, password) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Posts endpoints
  async getPosts(skip = 0, limit = 10, search = '') {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }

    return this.request(`/posts/?${params.toString()}`);
  }

  async getPost(postId) {
    return this.request(`/posts/${postId}`);
  }

  async createPost(postData) {
    return this.request('/posts/', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(postId, postData) {
    return this.request(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(postId) {
    return this.request(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  async likePost(postId) {
    return this.request(`/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  // Comment endpoints
  async getComments(postId, skip = 0, limit = 10) {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });

    return this.request(`/posts/${postId}/comments?${params.toString()}`);
  }

  async createComment(postId, commentData) {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async deleteComment(postId, commentId) {
    return this.request(`/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  async getUserPosts(userId, skip = 0, limit = 10) {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });

    return this.request(`/posts/user/${userId}?${params.toString()}`);
  }

  // Image upload
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${this.baseURL}/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': this.token ? `Bearer ${this.token}` : '',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  /**
   * Book a travel consultation / appointment (public; optional auth via stored token).
   * @param {Object} data - appointment fields (camelCase); converted to API shape.
   */
  async createAppointment(data) {
    const body = {
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      appointment_date: data.appointmentDate,
      appointment_time: data.appointmentTime,
      service_type: data.serviceType || 'general',
    };
    if (data.notes != null && String(data.notes).trim() !== '') {
      body.notes = data.notes.trim();
    }
    return this.request('/appointments/', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  /** List appointments for the logged-in user (requires Bearer token). */
  async getMyAppointments(skip = 0, limit = 50) {
    const params = new URLSearchParams({
      skip: String(skip),
      limit: String(limit),
    });
    return this.request(`/appointments/me?${params.toString()}`);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

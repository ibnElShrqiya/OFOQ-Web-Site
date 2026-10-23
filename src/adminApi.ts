export type ContentType = 'project' | 'tool' | 'python_script' | 'open_source_project' | 'article';
export type ContentItem = {
  id: string; content_type: ContentType; title: string; slug: string; summary: string; body: string;
  cover_image_url?: string | null; source_url?: string | null; github_url?: string | null; download_url?: string | null;
  license?: string | null; language?: string | null; requirements?: string | null; tags: string[]; is_published: boolean;
  created_at?: string; updated_at?: string;
};
export type ContactMessage = { id: string; name: string; email: string; subject: string; message: string; status: 'new'|'in_progress'|'resolved'|'spam'; created_at: string };
export type AdminReview = { id: string; display_name: string; company: string | null; rating: number; review_text: string; is_approved: boolean; created_at: string };

const TOKEN_KEY = 'ofoq_admin_access_token';
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (token: string | null) => token ? sessionStorage.setItem(TOKEN_KEY, token) : sessionStorage.removeItem(TOKEN_KEY);

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(url, { ...init, headers, credentials: 'same-origin' });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || `Request failed (${response.status})`);
  return result as T;
}
export const adminApi = {
  login: (email: string, password: string) => request<{ access_token: string; user: { email: string } }>('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => request<{ id: string; email: string; display_name: string }>('/api/admin/me'),
  listContent: (type: ContentType) => request<{ items: ContentItem[] }>(`/api/admin/content?type=${encodeURIComponent(type)}`),
  saveContent: (item: Partial<ContentItem>) => request<{ item: ContentItem }>(item.id ? `/api/admin/content/${item.id}` : '/api/admin/content', { method: item.id ? 'PATCH' : 'POST', body: JSON.stringify(item) }),
  deleteContent: (id: string) => request<{ ok: true }>(`/api/admin/content/${id}`, { method: 'DELETE' }),
  messages: () => request<{ items: ContactMessage[] }>('/api/admin/messages'),
  updateMessage: (id: string, status: ContactMessage['status']) => request<{ item: ContactMessage }>(`/api/admin/messages/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  reviews: () => request<{ items: AdminReview[] }>('/api/admin/reviews'),
  moderateReview: (id: string, is_approved: boolean) => request<{ item: AdminReview }>(`/api/admin/reviews/${id}`, { method: 'PATCH', body: JSON.stringify({ is_approved }) }),
  deleteReview: (id: string) => request<{ ok: true }>(`/api/admin/reviews/${id}`, { method: 'DELETE' }),
  logout: () => { setToken(null); },
};

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Puck } from '@puckeditor/core';
import { config } from '@/lib/puck/config';
import { apiClient } from '@/lib/api-client';
import { Page } from '@/lib/types';
import '@puckeditor/core/dist/index.css';

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPage();
  }, [params.id]);

  const loadPage = async () => {
    try {
      setLoading(true);
      const pageId = parseInt(params.id as string);
      const data = await apiClient.getPage(pageId);
      setPage(data);
      setSlug(data.slug);
      setTitle(data.title);
      setIsPublished(data.isPublished);
    } catch (err) {
      setError('Failed to load page');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const savePage = async (data: any) => {
    try {
      setSaving(true);
      const pageId = parseInt(params.id as string);
      await apiClient.updatePage(pageId, {
        slug,
        title,
        content: JSON.stringify(data),
        isPublished,
      });
      alert('Page saved successfully!');
    } catch (err) {
      console.error('Failed to save page:', err);
      setError('Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading page...</p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Page not found'}</p>
          <button
            onClick={() => router.push('/pages')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Pages
          </button>
        </div>
      </div>
    );
  }

  const initialData = page.content ? JSON.parse(page.content) : { content: [], root: {} };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/pages')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
              placeholder="Page Title"
            />
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span>Slug:</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
                placeholder="page-slug"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Published</span>
          </label>
          <button
            onClick={() => savePage(initialData)}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Puck
          config={config}
          data={initialData}
          onPublish={savePage}
        />
      </div>
    </div>
  );
}

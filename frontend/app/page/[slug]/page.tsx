'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Render } from '@puckeditor/core';
import { config } from '@/lib/puck/config';
import { apiClient } from '@/lib/api-client';
import { Page } from '@/lib/types';
import '@puckeditor/core/dist/index.css';

export default function PageView() {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPage();
  }, [params.slug]);

  const loadPage = async () => {
    try {
      setLoading(true);
      const slug = params.slug as string;
      const data = await apiClient.getPageBySlug(slug);
      
      if (!data.isPublished) {
        setError('This page is not published yet.');
        return;
      }
      
      setPage(data);
    } catch (err) {
      setError('Page not found');
      console.error(err);
    } finally {
      setLoading(false);
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
            onClick={() => router.push('/products')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Go to Products
          </button>
        </div>
      </div>
    );
  }

  const pageData = page.content ? JSON.parse(page.content) : { content: [], root: {} };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Render config={config} data={pageData} />
      </main>

      <footer className="mt-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.push('/products')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Products
          </button>
        </div>
      </footer>
    </div>
  );
}

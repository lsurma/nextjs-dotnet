# Dynamic Pages with Puck Editor - Proof of Concept

This proof-of-concept demonstrates the integration of [Puck Editor](https://puckeditor.com/) for creating and managing dynamic pages in the Next.js + .NET application.

## Overview

This implementation adds a complete page builder system that allows administrators to:
- Create dynamic pages using a visual drag-and-drop editor
- Build pages with pre-configured components (headings, text, buttons, images, product lists)
- Publish/unpublish pages
- View published pages with a clean frontend interface

## Features

### Backend (.NET API)

- **Page Model**: Stores page metadata and JSON content from Puck editor
- **PagesController**: Full CRUD API endpoints for page management
  - `GET /api/pages` - List all pages
  - `GET /api/pages/{id}` - Get page by ID
  - `GET /api/pages/slug/{slug}` - Get page by slug (for frontend rendering)
  - `POST /api/pages` - Create new page (requires authentication)
  - `PUT /api/pages/{id}` - Update page (requires authentication)
  - `DELETE /api/pages/{id}` - Delete page (requires authentication)
- **PageService**: In-memory storage service for pages

### Frontend (Next.js)

#### Pages Management (`/backoffice/pages`)
- Lists all pages with status, slug, and last updated date
- Create new pages
- Edit existing pages
- Delete pages
- View published pages

#### Page Editor (`/backoffice/pages/editor/[id]`)
- Full Puck visual editor integration
- Edit page title and slug
- Toggle publish/draft status
- Save page content

#### Page Viewer (`/page/[slug]`)
- Public-facing page display
- Only shows published pages
- Renders content using Puck's Render component

## Components Available in Puck Editor

1. **HeadingBlock**: Configurable headings (H1, H2, H3)
2. **TextBlock**: Rich text content
3. **ButtonBlock**: Call-to-action buttons with primary/secondary variants
4. **ImageBlock**: Image display with URL and alt text
5. **ProductListBlock**: Placeholder for dynamic product integration

## Architecture

### Data Flow

```
Admin creates/edits page in Puck Editor
↓
Page data (JSON) saved to backend via API
↓
Frontend fetches page data by slug
↓
Puck Render component displays the page
```

### Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Page Builder**: @puckeditor/core
- **Backend**: .NET 10 Web API
- **Data Storage**: In-memory (for demo purposes)

## Usage

### 1. Start the Backend
```bash
cd backend
dotnet run
```
The API will start on `http://localhost:5000`

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The application will start on `http://localhost:3000`

### 3. Access Pages Management

1. Login with admin credentials: `admin@shop.com` / `Admin123!`
2. Navigate to `/backoffice`
3. Click on "Pages" in the navigation
4. Create or edit pages using the Puck editor

### 4. View Published Pages

Published pages are accessible at `/page/{slug}` (e.g., `/page/homepage`)

## API Examples

### Create a new page
```bash
curl -X POST http://localhost:5000/api/pages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "slug": "about-us",
    "title": "About Us",
    "content": "{\"content\":[],\"root\":{}}",
    "isPublished": true
  }'
```

### Get page by slug
```bash
curl http://localhost:5000/api/pages/slug/homepage
```

### Update a page
```bash
curl -X PUT http://localhost:5000/api/pages/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "slug": "homepage",
    "title": "Updated Homepage",
    "content": "{\"content\":[...],\"root\":{}}",
    "isPublished": true
  }'
```

## Future Enhancements

### Potential Improvements

1. **Database Integration**: Replace in-memory storage with a database (SQL Server, PostgreSQL)
2. **More Components**: Add more Puck components:
   - Hero sections
   - Feature grids
   - Testimonials
   - Contact forms
   - Video embeds
3. **Dynamic Data Fetching**: Integrate ProductListBlock with actual product data from the API
4. **Page Templating**: Pre-built page templates for common use cases
5. **SEO Metadata**: Add SEO fields (meta description, keywords, OG tags)
6. **Version History**: Track page revisions and allow rollback
7. **Media Library**: Upload and manage images/assets
8. **Page Permissions**: Role-based access control for page editing
9. **Preview Mode**: Preview unpublished changes before going live
10. **Internationalization**: Multi-language support for pages

## Code Structure

```
backend/
├── Controllers/
│   └── PagesController.cs
├── Models/
│   └── Page.cs
└── Services/
    └── PageService.cs

frontend/
├── app/
│   ├── backoffice/
│   │   └── pages/
│   │       ├── page.tsx (Pages list)
│   │       └── editor/
│   │           └── [id]/
│   │               └── page.tsx (Puck editor)
│   └── page/
│       └── [slug]/
│           └── page.tsx (Page viewer)
└── lib/
    ├── api-client.ts (API methods)
    ├── types.ts (TypeScript types)
    └── puck/
        └── config.tsx (Puck configuration)
```

## Notes

- This is a proof-of-concept implementation for demonstration purposes
- Authentication uses JWT tokens stored in localStorage
- In production, implement proper security measures and database storage
- The Puck editor requires client-side rendering (`'use client'`)

## Screenshots

### Pages Management
![Pages Management](https://github.com/user-attachments/assets/22ec5b60-cf29-43cc-a034-ce49726c3f5f)

### Puck Editor
![Puck Editor](https://github.com/user-attachments/assets/4be5e4a4-45dd-46e4-adfb-8b68237377d9)

### Page Viewer
![Page Viewer](https://github.com/user-attachments/assets/c41b7b7e-cfef-4463-94f3-937bcccbef8a)

## License

MIT

## Authentication Endpoints

### POST /api/auth/register

Register a new developer account
Body: { name, email, password, company? }

### POST /api/auth/login

Login developer/admin
Body: { email, password }

### GET /api/auth/me

Get current user profile (requires auth)

## Tool Endpoints

### GET /api/tools

Get all approved tools (public)
Query params: page, limit, category, subcategory, pricing, search, sortBy

### GET /api/tools/:id

Get specific tool by ID (public)

### POST /api/tools/:id/click

Track tool click (public)

### POST /api/tools/submit

Submit new tool (requires developer auth)
Body: Tool data matching frontend form

### GET /api/tools/developer/my-tools

Get developer's own tools (requires auth)

### PUT /api/tools/:id

Update tool (requires auth, own tools only)

## Review Endpoints

### POST /api/reviews

Submit review (public)
Body: { tool, reviewerName, reviewerEmail, rating, comment }

### GET /api/reviews/tool/:toolId

Get reviews for a tool (public)

## Category Endpoints

### GET /api/categories

Get all categories with counts

### GET /api/categories/:category

Get tools by category with filters

## Banner Endpoints

### GET /api/banners/active

Get active banners (public)

## Admin Endpoints (require admin auth)

### GET /api/admin/stats

Get dashboard statistics

### GET /api/admin/tools/pending

Get pending tools for review

### PATCH /api/admin/tools/:id/status

Approve/reject tool
Body: { status: 'approved'|'rejected', adminNotes? }

### GET /api/admin/developers

Get all developers

### PATCH /api/admin/developers/:id/status

Update developer status
Body: { isActive: boolean }

### GET /api/admin/reviews/flagged

Get flagged reviews

### PATCH /api/admin/reviews/:id/moderate

Moderate review
Body: { action: 'approve'|'remove' }

### Banner Management

GET /api/banners - Get all banners
POST /api/banners - Create banner
PUT /api/banners/:id - Update banner
PATCH /api/banners/:id/toggle - Toggle status
DELETE /api/banners/:id - Delete banner

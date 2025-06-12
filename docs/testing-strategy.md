# 📄 Testing Strategy

## Testing Philosophy

Our testing approach prioritizes user experience and reliability. We implement multiple testing layers to ensure the application works correctly, looks great, and performs well across all devices and browsers.

## Testing Layers

### 1. Unit Testing

* **Focus**: Individual functions, hooks, and utilities
* **Tools**: Vitest or Jest
* **Coverage Target**: 70% minimum for utility functions

**Key Areas to Test:**
- WordPress API service functions
- Helper and utility functions
- Custom hooks like `usePosts`, `useCategories`
- State transformations and data processing

**Example Test Structure:**
```typescript
describe('wordpressApi.formatPostData', () => {
  it('should correctly format WordPress post data', () => {
    const mockWpPost = {...}; // Mock WordPress API response
    const expected = {...};   // Expected formatted post
    
    expect(formatPostData(mockWpPost)).toEqual(expected);
  });
  
  it('should handle missing featured images', () => {
    const mockWpPostNoImage = {...}; // Mock without image
    expect(formatPostData(mockWpPostNoImage).featuredImage).toBeUndefined();
  });
});
```

### 2. Component Testing

* **Focus**: Individual UI components
* **Tools**: React Testing Library
* **Coverage Target**: Key interactive components (forms, toggles, cards)

**Key Components to Test:**
- PostCard (various variants)
- ThemeToggle
- Pagination
- NewsletterSignup
- SearchDialog

**Example Test:**
```typescript
describe('PostCard Component', () => {
  it('should render post title and excerpt', () => {
    const mockPost = {...}; // Mock post data
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument();
  });
  
  it('should link to the correct post URL', () => {
    const mockPost = { slug: 'test-post', ...otherProps };
    render(<PostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/post/test-post');
  });
});
```

### 3. Integration Testing

* **Focus**: Component interactions and page flows
* **Tools**: React Testing Library, MSW (Mock Service Worker)
* **Coverage**: Main user flows

**Key Flows to Test:**
- Loading the homepage and navigating to a post
- Using the search feature
- Category filtering
- Newsletter signup submission

**Example Test:**
```typescript
describe('HomePage Integration', () => {
  beforeAll(() => {
    // Setup MSW to intercept API requests
    server.listen();
  });
  
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  it('should load posts and allow navigation to post detail', async () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    
    // Wait for posts to load
    const firstPost = await screen.findByText('Test Post Title');
    
    // Click on post
    userEvent.click(firstPost);
    
    // Expect navigation to post page
    expect(window.location.pathname).toEqual('/post/test-post');
  });
});
```

### 4. E2E Testing (Optional for MVP)

* **Focus**: Full user journeys
* **Tools**: Cypress or Playwright
* **Coverage**: Critical paths only

**Key Scenarios:**
- Complete user journey from homepage through article read to newsletter signup
- Dark mode toggle persistence
- Search functionality

## Testing Environment Configuration

### WordPress API Mocking

* Use MSW to intercept and mock WordPress API calls
* Create fixtures for common responses (posts, categories, etc.)
* Toggle between real API and mocks with environment variables

### Visual Testing

* Consider implementing Storybook for component visualization and testing
* Manual review of responsive layouts across breakpoints

## Pre-release QA Checklist

Before each significant release, manually verify:

1. **Functionality**
   - [ ] Homepage loads correctly with featured and latest posts
   - [ ] Post detail pages render content correctly
   - [ ] Search works for posts by title and content
   - [ ] Category filters show appropriate posts
   - [ ] Newsletter signup works and validates input
   - [ ] Dark mode toggle works and persists preference

2. **Responsive Design**
   - [ ] Test on mobile (iPhone SE size and up)
   - [ ] Test on tablet (iPad size)
   - [ ] Test on desktop (1080p and higher)

3. **Performance**
   - [ ] Lighthouse performance score above 85
   - [ ] No obvious loading delays or jank
   - [ ] Images load progressively

4. **Accessibility**
   - [ ] Proper heading hierarchy
   - [ ] All interactive elements accessible by keyboard
   - [ ] Sufficient color contrast
   - [ ] Alt text for images

5. **Cross-browser Testing**
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

## Automated Test Scripts

Add the following to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "cypress run"
  }
}
```

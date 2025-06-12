# 📄 WordPress Content Creation Guidelines

## Overview

This guide outlines best practices for creating and managing content in WordPress that will be displayed on the Saad.dev headless frontend. Following these guidelines ensures consistent, high-quality content presentation.

## Content Structure

### Post Organization

* **Categories**: Limit to 5-7 main categories (AI, Startups, Programming, etc.)
* **Tags**: Use liberally but consistently for granular topic organization
* **Series**: Group related posts using a custom taxonomy (if implemented)

### Post Elements

Each post should include:

1. **Title**: Clear, concise, under 60 characters
2. **Excerpt**: 150-200 characters summarizing the post
3. **Featured Image**: 1200×630px (optimal for social sharing)
4. **Content**: Properly formatted with headings, lists, and paragraphs
5. **Categories**: At least one, maximum three
6. **Tags**: Relevant keywords, 3-8 per post
7. **Custom Fields** (if using ACF):
   * `reading_time`: Estimated reading time in minutes
   * `is_featured`: Boolean to mark posts for homepage feature section

## Media Guidelines

### Image Specifications

* **Featured Images**: 1200×630px, 16:9 aspect ratio
* **In-content Images**: 900px max width, optimized for web
* **File Format**: WebP preferred, JPEG acceptable, PNG for graphics/screenshots
* **File Size**: Under 200KB for optimal performance
* **Naming Convention**: Use descriptive names with hyphens (e.g., `ai-machine-learning-comparison.webp`)

### File Organization

* Store images in WordPress Media Library using year/month folders
* Use ALT text for all images for accessibility and SEO

## Content Formatting

### Text Formatting

* **Headings**: Use H2 for main sections, H3 for subsections, H4 for further subdivision
* **Paragraphs**: Keep paragraphs short (2-4 sentences) for readability
* **Lists**: Use bullet points or numbered lists for sequential steps or multiple points
* **Code Blocks**: Use the code block format for any code snippets
* **Blockquotes**: Use for quotes from people or sources

### HTML Guidelines

* Keep HTML in the WordPress editor clean and simple
* Use native Gutenberg blocks when possible
* Avoid inline styles
* For custom styling needs, create reusable blocks

## SEO Best Practices

* **Title**: Include primary keyword near the beginning
* **URL Slug**: Short, descriptive, include primary keyword
* **Meta Description**: Write a custom meta description using Yoast SEO
* **Headings**: Include secondary keywords in H2 and H3 tags
* **Image Alt Text**: Descriptive, include keywords when relevant
* **Internal Linking**: Link to 2-3 related articles within your content

## Custom Fields Configuration

If using Advanced Custom Fields (ACF), set up these fields:

1. **Reading Time**
   * Field Name: `reading_time`
   * Type: Number
   * Instructions: "Estimated reading time in minutes"

2. **Featured Post**
   * Field Name: `is_featured`
   * Type: True/False
   * Instructions: "Check to display this post in the featured section"

3. **External Source** (if applicable)
   * Field Name: `external_source`
   * Type: URL
   * Instructions: "Link to original source if this is a reference/quote"

## Publishing Workflow

1. **Draft**: Initial content creation
2. **Review**: Check formatting, links, and images
3. **SEO Check**: Verify title, meta description, and keywords
4. **Publish**: Set publication date and time
5. **Promote**: Share on social media (can be automated)

## Content Calendar

* Maintain a content calendar with planned topics
* Aim for consistent publishing schedule (e.g., 2-3 posts per week)
* Balance content across categories
* Plan seasonal or trending topics in advance

## Author Profiles

* Complete author bio with professional photo
* Include social media links
* Maintain consistent writing style and voice

## Technical Considerations

### WordPress Plugins for Content

* **Yoast SEO**: For SEO metadata
* **Advanced Custom Fields**: For additional content fields
* **Smush or Imagify**: For image optimization
* **Table of Contents**: For longer articles

### Content Embeds

* **Code**: Use Syntax Highlighter for code snippets
* **Video**: Use YouTube or Vimeo embeds
* **Twitter**: Use Twitter embeds for quoting tweets
* **GitHub**: Use GitHub Gist embeds for code samples

## Common Issues and Solutions

* **Image Sizing**: If images appear cropped incorrectly, check the focal point setting
* **Content Formatting**: If paragraphs display incorrectly, check for extra line breaks
* **Missing Featured Images**: Ensure every post has a designated featured image
* **Category Assignment**: Every post must have at least one category

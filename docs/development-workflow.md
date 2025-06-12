# 📄 Development Workflow & Contribution Guidelines

## Development Environment Setup

### Prerequisites

* Node.js (v18+)
* npm or yarn
* Git
* VS Code (recommended, with ESLint and Prettier extensions)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogwordpressnitegration
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Configure environment variables**
   * Create a `.env` file in the root directory based on `.env.example`
   * Add the WordPress API URL
   ```
   VITE_WORDPRESS_API_URL=https://your-wp-site.com/wp-json
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Toggle between mock data and real API**
   * In `src/hooks/use-wordpress.ts`, set `USE_MOCK_DATA` to `true` or `false`

## Branch Strategy

```
main               # Production branch
├── development    # Development branch
│   ├── feature/X  # Feature branches
│   ├── bugfix/Y   # Bug fix branches
```

### Branch Naming Convention

* `feature/descriptive-name` - For new features
* `bugfix/issue-description` - For bug fixes
* `hotfix/critical-issue` - For urgent production fixes
* `docs/update-x` - For documentation updates

## Commit Message Guidelines

```
type(scope): short description

[optional body]

[optional footer]
```

Where `type` can be:
* `feat`: New feature
* `fix`: Bug fix
* `docs`: Documentation changes
* `style`: Code style changes (formatting, etc.)
* `refactor`: Code changes that neither fix bugs nor add features
* `perf`: Performance improvements
* `test`: Adding or updating tests
* `chore`: Changes to the build process or tools

Examples:
```
feat(api): add WordPress pagination support
fix(header): resolve theme toggle display issue
docs(readme): update installation instructions
```

## Pull Request Process

1. **Create a new branch** from `development`
2. **Make changes** and commit following the commit message format
3. **Write tests** for new functionality
4. **Run tests and linting**
   ```bash
   npm run lint
   ```
5. **Push branch** and create a pull request to `development`
6. **Request review** from at least one team member
7. **Address feedback** and make necessary changes
8. **Merge** once approved

## Code Style Guidelines

* Follow the ESLint configuration provided in the project
* Use TypeScript for type safety
* Prefer functional components with hooks over class components
* Keep components focused on a single responsibility
* Document complex functions and components
* Use clear, descriptive variable and function names

## Testing Strategy

* Write unit tests for utility functions
* Consider component tests for complex UI components
* Manual testing on different devices and browsers

## Deployment Pipeline

1. **Development** - Automatic deployment from `development` branch to dev environment
2. **Staging** - Manual promotion from dev to staging for QA
3. **Production** - Manual promotion from staging to production

## Release Tagging

Tag releases using semantic versioning:

```bash
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

# Git Workflow Guidelines

## Branch Protection Rules

To prevent accidental merges into protected branches like `main`, we should implement the following measures:

### GitHub Branch Protection

1. Go to GitHub repository settings
2. Navigate to "Branches" section
3. Add a branch protection rule for `main`
4. Enable the following settings:
   - Require pull request reviews before merging
   - Require approval from at least 1 reviewer
   - Dismiss stale pull request approvals when new commits are pushed
   - Restrict who can push to matching branches

### Local Development Practices

1. Never force push to `main` or `development` branches unless resolving a critical issue (like an accidental merge)
2. Always create pull requests to merge changes into protected branches
3. Use descriptive commit messages and branch names
4. Regular commits and pushes to feature branches to avoid large, complex merges

## Recovering from Accidental Merges

If an accidental merge occurs:

1. **Option 1 (Preferred): Create a revert commit**
   ```bash
   git checkout main
   git revert -m 1 <merge_commit_hash>
   git push origin main
   ```
   This creates a new commit that undoes the changes from the merge, preserving history.

2. **Option 2 (Use with caution): Reset branch and force push**
   ```bash
   git checkout main
   git reset --hard <commit_before_merge>
   git push --force origin main
   ```
   ⚠️ This rewrites history and can cause issues for other team members.

## Recommended Git Workflow Review

1. **Start from up-to-date development branch**
   ```bash
   git checkout development
   git pull origin development
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes, commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push -u origin feature/your-feature-name
   ```

4. **Create pull request from feature to development**
   - Use GitHub UI to create and review PRs
   - Ensure CI checks pass
   - Get code review

5. **Create pull request from development to main**
   - Only when features are ready for production
   - Requires additional review
   - Tests must pass in staging environment

By following these guidelines, we can maintain a clean and effective Git workflow.

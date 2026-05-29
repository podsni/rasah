# Task Completion Steps

Before considering a task complete, ensure the following steps are performed:

1. **Verify Correctness:** Manually check the UI and functionality (if possible via code review).
2. **Linting:** Run `bun run lint` to ensure no linting errors.
3. **Formatting:** Run `bun run format` to ensure consistent code style.
4. **Type Check:** Ensure TypeScript compiler doesn't report errors.
5. **Git Status:** Check `git status` to ensure all relevant files are ready for commit.
6. **Commit Message:** Write a descriptive commit message following project style (if any).

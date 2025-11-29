#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WORKTREE_DIR="$(cd "$ROOT_DIR" && pwd)/../myblog-gh-pages"
BRANCH="gh-pages"

cd "$ROOT_DIR"

echo "▶ Building static site..."
npm run build

echo "▶ Pruning stale worktrees"
git worktree prune >/dev/null 2>&1 || true

echo "▶ Fetching latest $BRANCH"
git fetch origin "$BRANCH" >/dev/null 2>&1 || true

if ! git show-ref --verify --quiet "refs/heads/$BRANCH"; then
	echo "▶ Creating local $BRANCH tracking origin/$BRANCH"
	if git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
		git branch "$BRANCH" "origin/$BRANCH" >/dev/null 2>&1
	else
		git branch "$BRANCH" >/dev/null 2>&1
	fi
fi

if git worktree list --porcelain | grep -F "worktree $WORKTREE_DIR" >/dev/null 2>&1; then
	echo "▶ Using existing worktree at $WORKTREE_DIR"
	if [ ! -d "$WORKTREE_DIR/.git" ]; then
		echo "⚠ Worktree metadata missing. Recreating..."
		git worktree remove --force "$WORKTREE_DIR" >/dev/null 2>&1 || true
		rm -rf "$WORKTREE_DIR"
		git worktree add "$WORKTREE_DIR" "$BRANCH"
	fi
else
	echo "▶ Creating worktree at $WORKTREE_DIR"
	rm -rf "$WORKTREE_DIR"
	git worktree add "$WORKTREE_DIR" "$BRANCH"
fi

cd "$WORKTREE_DIR"

echo "▶ Resetting worktree to origin/$BRANCH"
git reset --hard "origin/$BRANCH" >/dev/null 2>&1 || true

echo "▶ Cleaning previous deployment"
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

echo "▶ Copying fresh build"
cp -R "$ROOT_DIR/out"/* .
if [ -f "$ROOT_DIR/public/CNAME" ]; then
	cp "$ROOT_DIR/public/CNAME" ./CNAME
fi
touch .nojekyll

echo "▶ Preparing commit"
git add -A
if git diff --cached --quiet; then
	echo "No changes to deploy."
	exit 0
fi

git commit -m "Deploy $(date +%Y-%m-%dT%H:%M:%S%z)"
git push origin "$BRANCH"
echo "✅ Deployment complete."
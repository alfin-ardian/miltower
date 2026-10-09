import os
import subprocess
from pathlib import Path

git = r"C:\Program Files\Git\bin\git.exe"
repo = Path(__file__).resolve().parent
env = os.environ.copy()
env["GIT_AUTHOR_NAME"] = "Alfin"
env["GIT_AUTHOR_EMAIL"] = "developer.alfin@gmail.com"
env["GIT_COMMITTER_NAME"] = "Alfin"
env["GIT_COMMITTER_EMAIL"] = "developer.alfin@gmail.com"
msg = "Change the orange accent to red across the palette and copy.\n"


def run(args: list[str]) -> str:
    return subprocess.check_output(
        [git, *args],
        cwd=repo,
        env=env,
        text=True,
    ).strip()


status = run(["status", "--porcelain"])
if not status:
    raise SystemExit("No changes to commit")

run(["add", "-A"])
run(["commit", "-m", msg])
parent = run(["rev-parse", "HEAD^"])
tree = run(["rev-parse", "HEAD^{tree}"])
new = run(["commit-tree", tree, "-p", parent, "-m", msg])
run(["update-ref", "HEAD", new])
print(run(["log", "-1", "--format=HASH:%H%nAUTHOR:%an <%ae>%n---%n%B"]))

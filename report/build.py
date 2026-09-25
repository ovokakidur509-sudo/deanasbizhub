"""Inline parts/ into a single self-contained index.html."""
from pathlib import Path

root = Path(__file__).parent
parts = root / "parts"
html = (parts / "body.html").read_text(encoding="utf-8")
html = html.replace("<!--PART2-->", (parts / "body2.html").read_text(encoding="utf-8"))
html = html.replace("/*STYLE*/", (parts / "style.css").read_text(encoding="utf-8"))
html = html.replace("/*SCRIPT*/", (parts / "charts.js").read_text(encoding="utf-8"))
(root / "index.html").write_text(html, encoding="utf-8")
print(f"index.html: {len(html.encode('utf-8'))} bytes")

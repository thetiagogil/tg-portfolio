# Rebuilds docs/study/index.html from study-src.html, injecting the base64 fonts.
# Run from anywhere: python3 docs/study/src/build.py
import pathlib
here = pathlib.Path(__file__).resolve().parent
src = (here / "study-src.html").read_text()
fonts = (here / "fonts.css").read_text().rstrip("\n")
assert src.count("/*__FONTS__*/") == 1
(here.parent / "index.html").write_text(src.replace("/*__FONTS__*/", fonts))
print("built", len(src))

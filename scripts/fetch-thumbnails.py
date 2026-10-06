"""Tải Open Graph lúc biên soạn; website không gọi API hoặc cần Python.

Chạy: python scripts/fetch-thumbnails.py
Tùy chọn Pillow sẽ nén ảnh. Thất bại không thay thế ảnh đang có.
"""
import concurrent.futures
import html
import io
import json
from pathlib import Path
import re
import subprocess
import sys
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
sys.stdout.reconfigure(encoding='utf-8')
data = json.loads(subprocess.check_output(
    ['node', '--input-type=module', '-e',
     "import {site,programs} from './assets/js/data.js'; console.log(JSON.stringify({site,programs}));"],
    cwd=ROOT, encoding='utf-8'))
try:
    from PIL import Image
except ImportError:
    Image = None


def download(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(request, timeout=45) as response:
        return response.read(), response.status, response.url


def inspect(article):
    result = {'url': article['url'], 'localImage': article['thumbnail']}
    try:
        if article.get('_cached', {}).get('image'):
            result.update({k: v for k, v in article['_cached'].items() if k != 'error'})
        else:
            body, status, final_url = download(article['url'])
            source = body.decode('utf-8', errors='replace')
            result.update(status=status, finalUrl=final_url)
            title = re.search(r'<title[^>]*>(.*?)</title>', source, re.I | re.S)
            result['title'] = html.unescape(title.group(1).strip()) if title else ''
            for tag in re.findall(r'<meta\b[^>]*>', source, re.I):
                if re.search(r'(?:property|name)=["\']og:image["\']', tag, re.I):
                    match = re.search(r'content=["\']([^"\']+)', tag, re.I)
                    if match:
                        result['image'] = html.unescape(match.group(1))
                        break
        if not result.get('image'):
            raise ValueError('Không có og:image')
        content, _, _ = download(result['image'])
        destination = (ROOT / article['thumbnail']).resolve()
        if not destination.is_relative_to(ROOT / 'assets' / 'images'):
            raise ValueError('Đường dẫn thumbnail phải nằm trong assets/images')
        destination.parent.mkdir(parents=True, exist_ok=True)
        if Image:
            picture = Image.open(io.BytesIO(content)).convert('RGB')
            picture.thumbnail((1100, 750))
            picture.save(destination, format='JPEG', quality=84, optimize=True)
        else:
            destination.write_bytes(content)
        result['bytes'] = destination.stat().st_size
    except Exception as error:
        result['error'] = str(error)
    return result


articles = [a for p in data['programs'] for a in p['articles']]
previous = {}
cache_path = ROOT / '.qa' / 'link-metadata.json'
if '--retry' in sys.argv and cache_path.exists():
    previous = {r['url']: r for r in json.loads(cache_path.read_text(encoding='utf-8'))}
    articles = [dict(a, _cached=previous.get(a['url'], {})) for a in articles
                if previous.get(a['url'], {}).get('error') or not (ROOT / a['thumbnail']).exists()]
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    updated = list(pool.map(inspect, articles))
results = list({**previous, **{r['url']: r for r in updated}}.values())
(ROOT / '.qa').mkdir(exist_ok=True)
(ROOT / '.qa' / 'link-metadata.json').write_text(
    json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
for item in updated:
    print(json.dumps(item, ensure_ascii=False))

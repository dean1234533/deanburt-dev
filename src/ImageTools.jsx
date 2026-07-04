import { useCallback, useRef, useState } from 'react';

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const units = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[Math.min(i, 3)]}`;
}

function DropZone({ accept, onFile, icon = '📁', label, hint, multiple = false }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    if (multiple) {
      const arr = Array.from(files).filter(Boolean);
      if (arr.length) onFile(arr);
    } else {
      if (files[0]) onFile(files[0]);
    }
  };

  return (
    <div
      className={`drop-zone${dragging ? ' drop-zone--active' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={label || 'Upload file'}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragEnter={() => setDragging(true)}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false); }}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />
      <div className="drop-zone-icon" aria-hidden="true">{icon}</div>
      <p className="drop-zone-label">{label || 'Drop file here or click to upload'}</p>
      {hint && <span className="drop-zone-hint">{hint}</span>}
    </div>
  );
}

export function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [quality, setQuality] = useState(80);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const resultUrlRef = useRef(null);
  const debounceRef = useRef(null);
  const fileRef = useRef(null);

  const runCompress = useCallback((f, q) => {
    setProcessing(true);
    setResult(null);
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      const outType = f.type === 'image/png' ? 'image/png' : 'image/jpeg';
      canvas.toBlob((blob) => {
        if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
        const newUrl = URL.createObjectURL(blob);
        resultUrlRef.current = newUrl;
        setResult({ url: newUrl, size: blob.size });
        setProcessing(false);
      }, outType, q);
    };
    img.onerror = () => {
      setError('Could not process this image. Please try a different file.');
      setProcessing(false);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleFile = (f) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
      setError('Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setError('Please upload an image under 20MB.');
      return;
    }
    setError('');
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(URL.createObjectURL(f));
    setFile(f);
    fileRef.current = f;
    runCompress(f, quality / 100);
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    if (!fileRef.current) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runCompress(fileRef.current, newQuality / 100), 350);
  };

  const pctSaved = file && result ? Math.max(0, Math.round((1 - result.size / file.size) * 100)) : 0;

  const download = () => {
    if (!result || !file) return;
    const ext = file.type === 'image/png' ? 'png' : 'jpg';
    const a = document.createElement('a');
    a.href = result.url;
    a.download = file.name.replace(/\.[^.]+$/, `_compressed.${ext}`);
    a.click();
  };

  const reset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    resultUrlRef.current = null;
    setFile(null); setOriginalUrl(null); setResult(null); setError('');
  };

  if (!file) return (
    <div className="tool-panel">
      <DropZone
        accept="image/jpeg,image/png,image/webp"
        onFile={handleFile}
        icon="🖼️"
        label="Drop a JPG, PNG, or WebP image here"
        hint="Supports JPG · PNG · WebP · Max 20MB · Processed locally in your browser"
      />
      {error && <p className="it-error">{error}</p>}
    </div>
  );

  return (
    <div className="tool-panel">
      <div className="it-compare">
        <div className="it-compare-item">
          <span className="it-label">Original · {formatBytes(file.size)}</span>
          {originalUrl && <img src={originalUrl} alt="Original" className="it-preview" loading="lazy" />}
        </div>
        <div className="it-compare-item">
          <span className="it-label">Compressed{result ? ` · ${formatBytes(result.size)}` : ''}</span>
          {processing && <div className="it-processing">Compressing…</div>}
          {!processing && result && <img src={result.url} alt="Compressed" className="it-preview" loading="lazy" />}
        </div>
      </div>
      <div className="it-quality">
        <label className="it-quality-label">
          Quality: <strong>{quality}%</strong>
          <input type="range" min="10" max="100" value={quality} onChange={(e) => handleQualityChange(Number(e.target.value))} />
        </label>
      </div>
      {result && (
        <div className="it-actions">
          {pctSaved > 0 && <span className="it-badge">↓ {pctSaved}% · {formatBytes(file.size - result.size)} saved</span>}
          <button className="button button-primary" type="button" onClick={download}>Download compressed image</button>
          <button className="button button-secondary" type="button" onClick={reset}>Upload another image</button>
        </div>
      )}
      <p className="it-privacy">🔒 Processed locally in your browser. Your image is never uploaded to any server.</p>
    </div>
  );
}

export function FormatConverter({ fromLabel, toType, toLabel, accept, hasBg = false, note }) {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const resultUrlRef = useRef(null);

  const webpWarn = toType === 'image/webp' ? (() => {
    const c = document.createElement('canvas');
    c.width = 1; c.height = 1;
    return !c.toDataURL('image/webp').startsWith('data:image/webp');
  })() : false;

  const runConvert = useCallback((f, bg) => {
    setProcessing(true);
    setResult(null);
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (toType === 'image/jpeg') {
        ctx.fillStyle = bg || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
        const newUrl = URL.createObjectURL(blob);
        resultUrlRef.current = newUrl;
        setResult({ url: newUrl, size: blob.size });
        setProcessing(false);
      }, toType, toType === 'image/jpeg' ? 0.92 : undefined);
    };
    img.onerror = () => { setError('Could not process this image.'); setProcessing(false); URL.revokeObjectURL(url); };
    img.src = url;
  }, [toType]);

  const handleFile = (f) => {
    if (f.size > 20 * 1024 * 1024) { setError('Please upload an image under 20MB.'); return; }
    setError('');
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(URL.createObjectURL(f));
    setFile(f);
    runConvert(f, bgColor);
  };

  const download = () => {
    if (!result || !file) return;
    const extMap = { 'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg' };
    const a = document.createElement('a');
    a.href = result.url;
    a.download = file.name.replace(/\.[^.]+$/, '') + '.' + (extMap[toType] || 'bin');
    a.click();
  };

  const reset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    resultUrlRef.current = null;
    setFile(null); setOriginalUrl(null); setResult(null); setError('');
  };

  if (!file) return (
    <div className="tool-panel">
      {webpWarn && <p className="it-warning">⚠️ Your browser may not support WebP encoding. For best results, use Chrome, Firefox, or Edge.</p>}
      <DropZone accept={accept} onFile={handleFile} icon="🔄" label={`Drop a ${fromLabel} image here`} hint={`${fromLabel} images only · Max 20MB · Processed locally in your browser`} />
      {error && <p className="it-error">{error}</p>}
    </div>
  );

  return (
    <div className="tool-panel">
      {webpWarn && <p className="it-warning">⚠️ Your browser may not fully support WebP encoding. For best results, use Chrome, Firefox, or Edge.</p>}
      <div className="it-compare">
        <div className="it-compare-item">
          <span className="it-label">Original {fromLabel} · {formatBytes(file.size)}</span>
          {originalUrl && <img src={originalUrl} alt={`Original ${fromLabel}`} className="it-preview" loading="lazy" />}
        </div>
        <div className="it-compare-item">
          <span className="it-label">Converted {toLabel}{result ? ` · ${formatBytes(result.size)}` : ''}</span>
          {processing && <div className="it-processing">Converting…</div>}
          {!processing && result && <img src={result.url} alt={`Converted ${toLabel}`} className="it-preview" loading="lazy" />}
        </div>
      </div>
      {hasBg && (
        <div className="it-bg-picker">
          <label className="it-quality-label">
            Background colour (for transparent areas):
            <input
              type="color"
              value={bgColor}
              onChange={(e) => { setBgColor(e.target.value); if (file) runConvert(file, e.target.value); }}
              className="it-color-input"
            />
          </label>
        </div>
      )}
      {result && (
        <div className="it-actions">
          <button className="button button-primary" type="button" onClick={download}>Download {toLabel}</button>
          <button className="button button-secondary" type="button" onClick={reset}>Upload another image</button>
        </div>
      )}
      {note && <p className="it-note">{note}</p>}
      <p className="it-privacy">🔒 Processed locally in your browser. Your image is never uploaded to any server.</p>
    </div>
  );
}

export function ImageSizeChecker() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');

  const handleFile = (f) => {
    if (!f.type.startsWith('image/')) { setError('Please upload an image file.'); return; }
    if (f.size > 50 * 1024 * 1024) { setError('Please upload an image under 50MB.'); return; }
    setError('');
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const rating = f.size < 100 * 1024 ? 'good' : f.size < 300 * 1024 ? 'warn' : 'bad';
      setInfo({ name: f.name, size: f.size, type: f.type.replace('image/', '').toUpperCase(), width: img.naturalWidth, height: img.naturalHeight, rating });
    };
    img.onerror = () => { setError('Could not read this image.'); URL.revokeObjectURL(url); };
    img.src = url;
  };

  const RATINGS = {
    good: { icon: '✅', msg: 'This image looks suitable for website use.', color: '#34d399' },
    warn: { icon: '⚠️', msg: 'This image may be a bit large for website use. Consider compressing it or converting to WebP.', color: '#fbbf24' },
    bad: { icon: '🔴', msg: 'This image is too large and could slow down your website. Try compressing it or converting it to WebP.', color: '#fb7185' },
  };

  if (!info) return (
    <div className="tool-panel">
      <DropZone accept="image/*" onFile={handleFile} icon="📏" label="Drop an image here to check its size" hint="Supports all image formats · Max 50MB · No file is uploaded" />
      {error && <p className="it-error">{error}</p>}
    </div>
  );

  const r = RATINGS[info.rating];
  return (
    <div className="tool-panel">
      <div className="it-info-grid">
        {[['File size', formatBytes(info.size)], ['Dimensions', `${info.width} × ${info.height} px`], ['Format', info.type], ['Filename', info.name]].map(([label, val]) => (
          <div className="it-info-item" key={label}><span>{label}</span><strong title={val}>{val}</strong></div>
        ))}
      </div>
      <div className="it-status" style={{ '--status-color': r.color }}>
        {r.icon} {r.msg}
      </div>
      {info.rating !== 'good' && (
        <div className="it-suggestions">
          <p>Suggested next steps:</p>
          <div className="it-suggestion-links">
            <a className="button button-secondary" href="/tools/image-compressor">Compress this image →</a>
            <a className="button button-secondary" href="/tools/jpg-to-webp">Convert JPG to WebP →</a>
            <a className="button button-secondary" href="/tools/png-to-webp">Convert PNG to WebP →</a>
          </div>
        </div>
      )}
      <p className="it-guide">Website image guide: most images should be under 200 KB. Full-width hero images can go up to 400 KB. Images over 500 KB are too large for most websites.</p>
      <button className="button button-secondary" type="button" onClick={() => setInfo(null)} style={{ marginTop: 16 }}>Check another image</button>
      <p className="it-privacy">🔒 File analysis happens locally in your browser. No images are uploaded to any server.</p>
    </div>
  );
}

export function PdfCompressor() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (f) => {
    if (f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
    if (f.size > 50 * 1024 * 1024) { setError('Please upload a PDF under 50MB.'); return; }
    setError('');
    setFile(f);
    runCompress(f);
  };

  const runCompress = async (f) => {
    setProcessing(true);
    setResult(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const buf = await f.arrayBuffer();
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
      doc.setTitle(''); doc.setAuthor(''); doc.setSubject('');
      doc.setKeywords([]); doc.setProducer(''); doc.setCreator('');
      const bytes = await doc.save({ useObjectStreams: true });
      setResult({ blob: new Blob([bytes], { type: 'application/pdf' }), size: bytes.length });
    } catch {
      setError('Could not process this PDF. The file may be encrypted or corrupted.');
    }
    setProcessing(false);
  };

  const download = () => {
    if (!result || !file) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(result.blob);
    a.download = file.name.replace(/\.pdf$/i, '_compressed.pdf');
    a.click();
  };

  const reset = () => { setFile(null); setResult(null); setError(''); };
  const pctSaved = file && result ? Math.max(0, Math.round((1 - result.size / file.size) * 100)) : 0;

  if (!file) return (
    <div className="tool-panel">
      <DropZone accept="application/pdf,.pdf" onFile={handleFile} icon="📄" label="Drop a PDF file here" hint="PDF files only · Max 50MB · Processed locally in your browser" />
      {error && <p className="it-error">{error}</p>}
      <p className="it-note">This tool removes PDF metadata and compresses document structure. Best results on text-heavy PDFs. PDFs that are mostly large embedded images may see smaller reductions from browser-based compression.</p>
    </div>
  );

  return (
    <div className="tool-panel">
      <div className="it-info-grid">
        <div className="it-info-item"><span>Original size</span><strong>{formatBytes(file.size)}</strong></div>
        {result && <div className="it-info-item"><span>Compressed size</span><strong>{formatBytes(result.size)}</strong></div>}
        {result && pctSaved > 0 && <div className="it-info-item"><span>Space saved</span><strong style={{ color: '#34d399' }}>↓ {pctSaved}%</strong></div>}
        {result && pctSaved === 0 && <div className="it-info-item"><span>Status</span><strong style={{ color: '#fbbf24', fontSize: 13 }}>Already optimised</strong></div>}
      </div>
      {processing && <div className="it-processing" style={{ margin: '16px 0' }}>Compressing PDF…</div>}
      {result && (
        <div className="it-actions">
          <button className="button button-primary" type="button" onClick={download}>Download compressed PDF</button>
          <button className="button button-secondary" type="button" onClick={reset}>Upload another PDF</button>
        </div>
      )}
      <p className="it-privacy">🔒 Your PDF is processed locally in your browser. It is never uploaded to any server.</p>
    </div>
  );
}

export function ImageToPdf() {
  const [images, setImages] = useState([]);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = (files) => {
    const valid = files.filter(f => ['image/jpeg', 'image/png'].includes(f.type));
    if (!valid.length) { setError('Please upload JPG or PNG images.'); return; }
    if (valid.length < files.length) setError(`${files.length - valid.length} file(s) skipped — only JPG and PNG are supported.`);
    else setError('');
    setResult(null);
    setImages(prev => [...prev, ...valid.map(f => ({ file: f, url: URL.createObjectURL(f), id: Math.random().toString(36).slice(2) }))]);
  };

  const removeImage = (id) => {
    setImages(prev => {
      const item = prev.find(i => i.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter(i => i.id !== id);
    });
  };

  const moveImage = (id, dir) => {
    setImages(prev => {
      const idx = prev.findIndex(i => i.id === id);
      if ((dir === -1 && idx === 0) || (dir === 1 && idx === prev.length - 1)) return prev;
      const arr = [...prev];
      [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]];
      return arr;
    });
  };

  const convert = async () => {
    if (!images.length) return;
    setProcessing(true);
    setResult(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.create();
      for (const item of images) {
        const bytes = await item.file.arrayBuffer();
        const image = item.file.type === 'image/jpeg' ? await doc.embedJpg(bytes) : await doc.embedPng(bytes);
        const scaled = image.scaleToFit(595, 842);
        const page = doc.addPage([595, 842]);
        page.drawImage(image, { x: (595 - scaled.width) / 2, y: (842 - scaled.height) / 2, width: scaled.width, height: scaled.height });
      }
      const pdfBytes = await doc.save();
      setResult({ blob: new Blob([pdfBytes], { type: 'application/pdf' }), size: pdfBytes.length });
    } catch {
      setError('Could not create the PDF. Please try again.');
    }
    setProcessing(false);
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(result.blob);
    a.download = 'images.pdf';
    a.click();
  };

  const reset = () => {
    images.forEach(i => URL.revokeObjectURL(i.url));
    setImages([]); setResult(null); setError('');
  };

  return (
    <div className="tool-panel">
      <DropZone accept="image/jpeg,image/png" onFile={handleFiles} multiple icon="📑" label="Drop JPG or PNG images here" hint="Multiple images supported · Each image becomes a page · JPG and PNG only · Max 20MB per image" />
      {error && <p className="it-error">{error}</p>}
      {images.length > 0 && (
        <div className="it-image-list">
          <p className="it-list-count">{images.length} image{images.length !== 1 ? 's' : ''} — each will become one page in the PDF.</p>
          {images.map((item, idx) => (
            <div className="it-list-item" key={item.id}>
              <img src={item.url} alt={item.file.name} />
              <span className="it-list-name" title={item.file.name}>{item.file.name}</span>
              <span className="it-list-size">{formatBytes(item.file.size)}</span>
              <div className="it-list-controls">
                {idx > 0 && <button type="button" className="it-move-btn" onClick={() => moveImage(item.id, -1)} title="Move up">↑</button>}
                {idx < images.length - 1 && <button type="button" className="it-move-btn" onClick={() => moveImage(item.id, 1)} title="Move down">↓</button>}
                <button type="button" className="it-remove-btn" onClick={() => removeImage(item.id)} title="Remove">×</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {images.length > 0 && (
        <div className="it-actions">
          {!processing && !result && <button className="button button-primary" type="button" onClick={convert}>Convert to PDF</button>}
          {processing && <div className="it-processing">Creating PDF…</div>}
          {result && (
            <>
              <span className="it-badge">✓ PDF ready · {formatBytes(result.size)}</span>
              <button className="button button-primary" type="button" onClick={download}>Download PDF</button>
              <button className="button button-secondary" type="button" onClick={reset}>Start again</button>
            </>
          )}
        </div>
      )}
      <p className="it-privacy">🔒 All processing happens locally in your browser. Your images are never uploaded to any server.</p>
    </div>
  );
}

export function FileSizeConverter() {
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('mb');

  const UNITS = [
    { id: 'bytes', label: 'Bytes', factor: 1 },
    { id: 'kb', label: 'Kilobytes (KB)', factor: 1024 },
    { id: 'mb', label: 'Megabytes (MB)', factor: 1024 ** 2 },
    { id: 'gb', label: 'Gigabytes (GB)', factor: 1024 ** 3 },
    { id: 'tb', label: 'Terabytes (TB)', factor: 1024 ** 4 },
  ];

  const factor = UNITS.find(u => u.id === unit)?.factor || 1;
  const bytes = parseFloat(value) * factor || 0;
  const hasValue = value !== '' && !isNaN(parseFloat(value)) && bytes > 0;

  return (
    <div className="tool-panel">
      <div className="form-grid">
        <label className="field">
          <span>Value</span>
          <input type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 1.5" />
        </label>
        <label className="field">
          <span>Unit</span>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            {UNITS.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </label>
      </div>
      {hasValue && (
        <div className="result-box" style={{ marginTop: 18 }}>
          <h3>Conversion results</h3>
          {UNITS.map(u => (
            <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: 'var(--muted)' }}>{u.label}</span>
              <strong style={{ color: u.id === unit ? 'var(--blue)' : 'var(--text)' }}>
                {(bytes / u.factor).toLocaleString('en-GB', { maximumFractionDigits: 6 })}
              </strong>
            </div>
          ))}
          <p style={{ marginTop: 12, color: 'var(--muted)', fontSize: 12 }}>Binary standard: 1 KB = 1,024 bytes</p>
        </div>
      )}
    </div>
  );
}

const CONVERTER_CONFIGS = {
  'jpg-to-webp': { fromLabel: 'JPG', toType: 'image/webp', toLabel: 'WebP', accept: 'image/jpeg', note: 'WebP files are typically 25–35% smaller than JPG and are the recommended format for website images.' },
  'png-to-webp': { fromLabel: 'PNG', toType: 'image/webp', toLabel: 'WebP', accept: 'image/png', note: 'WebP supports transparency and is typically 25–35% smaller than PNG — ideal for website images.' },
  'webp-to-png': { fromLabel: 'WebP', toType: 'image/png', toLabel: 'PNG', accept: 'image/webp', note: 'PNG is a lossless format with universal software and app compatibility.' },
  'png-to-jpg': { fromLabel: 'PNG', toType: 'image/jpeg', toLabel: 'JPG', accept: 'image/png', hasBg: true, note: 'Transparent areas will be filled with your chosen background colour since JPG does not support transparency.' },
  'jpg-to-png': { fromLabel: 'JPG', toType: 'image/png', toLabel: 'PNG', accept: 'image/jpeg', note: 'PNG is lossless. Converting from JPG to PNG prevents further quality loss from future re-saving.' },
};

export function ImageToolWorkspace({ slug }) {
  if (slug === 'image-compressor') return <ImageCompressor />;
  if (slug === 'image-size-checker') return <ImageSizeChecker />;
  if (slug === 'pdf-compressor') return <PdfCompressor />;
  if (slug === 'image-to-pdf') return <ImageToPdf />;
  if (slug === 'file-size-converter') return <FileSizeConverter />;
  if (CONVERTER_CONFIGS[slug]) return <FormatConverter {...CONVERTER_CONFIGS[slug]} />;
  return null;
}

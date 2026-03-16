/* =====================================================
   dialog.js — Système de dialogue HTML
   Overlay DOM indépendant du canvas Phaser.
===================================================== */
var CV = CV || {};

CV.Dialog = (function () {

  var _data    = null;   // contenu actuel
  var _page    = 0;
  var _open    = false;
  var _onClose = null;

  /* ---- Création du DOM au premier appel -------- */
  function _ensureDOM() {
    if (document.getElementById('cv-dialog')) return;

    var css = `
      #cv-dialog-backdrop {
        position:fixed; inset:0;
        background:rgba(0,0,0,0.55);
        z-index:1000;
        display:none;
        align-items:flex-end;
        justify-content:center;
        padding-bottom:28px;
        font-family:'Press Start 2P', monospace;
      }
      #cv-dialog-backdrop.open { display:flex; }

      #cv-dialog {
        background:#0A0818;
        border:3px solid #C8A030;
        box-shadow:0 0 0 1px #5A3800, 0 8px 40px rgba(0,0,0,0.8);
        width:min(700px, 96vw);
        max-height:55vh;
        display:flex;
        flex-direction:column;
        image-rendering:pixelated;
        animation:dlg-in .15s ease-out;
      }
      @keyframes dlg-in {
        from { transform:translateY(12px); opacity:0; }
        to   { transform:none; opacity:1; }
      }

      #cv-dialog-header {
        display:flex;
        align-items:center;
        gap:10px;
        padding:10px 14px 8px;
        border-bottom:2px solid #3A2800;
        background:#100E20;
        flex-shrink:0;
      }
      #cv-dialog-icon { font-size:18px; line-height:1; }
      #cv-dialog-title {
        font-size:9px;
        color:#F0D060;
        letter-spacing:2px;
        flex:1;
      }
      #cv-dialog-pagenum {
        font-size:7px;
        color:#7A6A40;
        letter-spacing:1px;
      }

      #cv-dialog-body {
        padding:14px 16px;
        flex:1;
        overflow-y:auto;
        font-size:8px;
        line-height:2;
        color:#D8C8A0;
        white-space:pre-wrap;
        word-break:break-word;
      }

      #cv-dialog-footer {
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:8px 14px;
        border-top:2px solid #3A2800;
        background:#100E20;
        flex-shrink:0;
        gap:8px;
      }
      .cv-dlg-btn {
        font-family:'Press Start 2P', monospace;
        font-size:7px;
        padding:6px 12px;
        border:1px solid #5A3800;
        background:#1A1408;
        color:#C8A030;
        cursor:pointer;
        letter-spacing:1px;
        transition:background .1s;
      }
      .cv-dlg-btn:hover  { background:#2A2010; }
      .cv-dlg-btn:disabled { color:#3A3020; cursor:default; }
      #cv-dialog-hint {
        font-size:6px;
        color:#4A4030;
        letter-spacing:1px;
        flex:1;
        text-align:center;
      }
      ::-webkit-scrollbar       { width:4px; }
      ::-webkit-scrollbar-track { background:#1A1408; }
      ::-webkit-scrollbar-thumb { background:#5A3800; }
    `;

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var backdrop = document.createElement('div');
    backdrop.id = 'cv-dialog-backdrop';
    backdrop.innerHTML = `
      <div id="cv-dialog">
        <div id="cv-dialog-header">
          <span id="cv-dialog-icon">📜</span>
          <span id="cv-dialog-title">TITRE</span>
          <span id="cv-dialog-pagenum"></span>
        </div>
        <div id="cv-dialog-body"></div>
        <div id="cv-dialog-footer">
          <button class="cv-dlg-btn" id="cv-dlg-prev">◀</button>
          <span id="cv-dialog-hint"></span>
          <button class="cv-dlg-btn" id="cv-dlg-next">▶</button>
          <button class="cv-dlg-btn" id="cv-dlg-close">✕</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    document.getElementById('cv-dlg-prev').onclick  = function() { _changePage(-1); };
    document.getElementById('cv-dlg-next').onclick  = function() { _changePage(+1); };
    document.getElementById('cv-dlg-close').onclick = function() { CV.Dialog.close(); };
    backdrop.onclick = function(e) { if (e.target === backdrop) CV.Dialog.close(); };

    /* Keyboard: E / Esc = close, arrows = page */
    document.addEventListener('keydown', function(e) {
      if (!_open) return;
      if (e.code === 'KeyE' || e.code === 'Escape') {
        CV.Dialog.close(); e.preventDefault();
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        _changePage(+1); e.preventDefault();
      } else if (e.code === 'ArrowLeft'  || e.code === 'KeyA') {
        _changePage(-1); e.preventDefault();
      }
    });
  }

  function _changePage(delta) {
    if (!_data) return;
    var pages = _data.pages || [];
    _page = Math.max(0, Math.min(pages.length - 1, _page + delta));
    _render();
  }

  function _render() {
    if (!_data) return;
    var pages = _data.pages || [];
    var lang  = CV.lang || 'fr';

    document.getElementById('cv-dialog-icon').textContent  = _data.icon || '📜';
    document.getElementById('cv-dialog-title').textContent = CV.t(_data.title) || '';
    document.getElementById('cv-dialog-body').textContent  =
      pages[_page] ? (CV.t(pages[_page]) || '') : '';

    var hint = CV.t(CV.content.ui.close) || 'Close';
    document.getElementById('cv-dialog-hint').textContent = hint;

    if (pages.length > 1) {
      document.getElementById('cv-dialog-pagenum').textContent =
        (CV.t(CV.content.ui.page) || 'Page') + ' ' + (_page + 1) + '/' + pages.length;
    } else {
      document.getElementById('cv-dialog-pagenum').textContent = '';
    }

    document.getElementById('cv-dlg-prev').disabled = (_page <= 0);
    document.getElementById('cv-dlg-next').disabled = (_page >= pages.length - 1);
  }

  /* ---- API publique ----------------------------- */
  return {

    open: function(interactionKey, onCloseCallback) {
      _ensureDOM();
      var data = CV.content.objects[interactionKey];
      if (!data) return;

      _data    = data;
      _page    = 0;
      _open    = true;
      _onClose = onCloseCallback || null;

      _render();
      document.getElementById('cv-dialog-backdrop').classList.add('open');
    },

    close: function() {
      _open = false;
      var bd = document.getElementById('cv-dialog-backdrop');
      if (bd) bd.classList.remove('open');
      if (_onClose) { _onClose(); _onClose = null; }
    },

    isOpen: function() { return _open; },

  };

}());

window.MX = window.MX || {};
// Crea un elemento DOM: h('div', {class:'x', onclick:fn}, hijos...)
MX.h = function (tag, attrs, ...kids) {
  const e = document.createElement(tag);
  let val;
  for (const k in (attrs || {})) {
    const v = attrs[k];
    if (k === 'value') val = v;
    else if (k === 'class') e.className = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v);
  }
  kids.flat().forEach(x => e.append(x instanceof Node ? x : document.createTextNode(x ?? '')));
  if (val !== undefined) e.value = val;
  return e;
};
MX.sel = (opts, val, on) => MX.h('select', { value: val, onchange: on },
  opts.map(o => MX.h('option', { value: o.v ?? o }, o.t ?? o)));
MX.msg = (m, ok) => MX.h('p', { class: 'msg ' + (ok ? 'ok' : 'err'), role: 'alert' }, m);
MX.toast = (m, ok = true) => {
  const t = MX.h('div', { class: 'toast ' + (ok ? '' : 'err'), role: 'status' }, m);
  document.body.append(t);
  setTimeout(() => t.remove(), 3500);
};

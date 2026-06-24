'use client';

import React from 'react';

export function ToolUserSidebar() {
  return (
    <aside style={{position: 'fixed', right: 20, top: 100, width: 240}}>
      <div style={{background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.08)'}}>
        <h4 style={{margin: 0, marginBottom: 8}}>Free Tools</h4>
        <p style={{margin: 0, fontSize: 13}}>Tool user sidebar (shim)</p>
      </div>
    </aside>
  );
}

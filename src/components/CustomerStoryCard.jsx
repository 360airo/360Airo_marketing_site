import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerStoryCard({ company, title, tags, image, to }) {
  return (
    <Link to={to || "#"} className="cs-card-modern group">
      <div className="cs-card-image-wrapper">
        <img src={image} alt={company} className="cs-card-img" width="800" height="533" loading="lazy" decoding="async" />
      </div>
      <div className="cs-card-content-modern">
        <h2 className="cs-card-title-modern">{title}</h2>
        <div className="cs-card-tags">
          {tags && tags.map((tag, i) => (
            <span key={i} className="cs-card-tag">
              {tag.icon && <span className="cs-tag-icon">{tag.icon}</span>}
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

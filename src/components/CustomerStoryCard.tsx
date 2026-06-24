import React from 'react';
import Link from 'next/link';

interface Tag {
  label: string;
  icon?: React.ReactNode;
}

interface CustomerStoryCardProps {
  company: string;
  title: string;
  tags?: Tag[];
  image: string;
  to?: string;
}

export default function CustomerStoryCard({ company, title, tags, image, to }: CustomerStoryCardProps) {
  return (
    <Link href={to || "#"} className="cs-card-modern group">
      <div className="cs-card-image-wrapper">
        <img src={image} alt={company} className="cs-card-img" width="800" height="533" loading="lazy" decoding="async" />
      </div>
      <div className="cs-card-content-modern">
        <h2 className="cs-card-title-modern">{title}</h2>
        <div className="cs-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div className="cs-card-tags" style={{ margin: 0 }}>
            {tags && tags.map((tag, i) => (
              <span key={i} className="cs-card-tag">
                {tag.icon && <span className="cs-tag-icon">{tag.icon}</span>}
                {tag.label}
              </span>
            ))}
          </div>
          <span className="cs-card-read-more" style={{ fontSize: '13px', fontWeight: 600, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Read More &rarr;</span>
        </div>
      </div>
    </Link>
  );
}

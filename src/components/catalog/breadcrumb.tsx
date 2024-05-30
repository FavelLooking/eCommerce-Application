import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbLink from './breadcrumb_link';

export default function Breadcrumb() {
  const location = useLocation();
  const [href, setHref] = useState({
    catalog: '',
    category: '',
    subcategory: '',
  });

  useEffect(() => {
    const currentPath = location.pathname.split('/');
    setHref({
      catalog: currentPath?.at(1) ?? '',
      category: currentPath?.at(2) ?? '',
      subcategory: currentPath?.at(3) ?? '',
    });
  }, [location.pathname]);

  return (
    <div className="catalog-breadcrumb">
      {href.catalog && <BreadcrumbLink path="/catalog" text="Catalog" />}
      {href.category && (
        <BreadcrumbLink
          path={`/catalog/${href.category}`}
          text={href.category}
        />
      )}
      {href.subcategory && (
        <BreadcrumbLink
          path={`/catalog/${href.category}/${href.subcategory}`}
          text={href.subcategory}
        />
      )}
    </div>
  );
}

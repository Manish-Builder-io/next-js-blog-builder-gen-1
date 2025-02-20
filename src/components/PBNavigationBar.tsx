import React from 'react';
import PropTypes from 'prop-types';

const PBNavigationBar = ({ categories }) => {

  console.log("🚀 ~ PBNavigationBar ~ categories:", categories);

  const renderCategories = (categories) => {
    return categories?.map((category, index) => (
      <li key={index}>
        <a href={category.data.link}>{category.data.name}</a>
        {category.children && category.data.children.length > 0 && (
          <ul>{renderCategories(category.data.children)}</ul>
        )}
      </li>
    ));
  };

  return (
    <nav>
      <ul>{renderCategories(categories)}</ul>
    </nav>
  );
};

PBNavigationBar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      role: PropTypes.shape({
        admin: PropTypes.bool,
        developer: PropTypes.bool,
        designer: PropTypes.bool,
      }),
      children: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
          role: PropTypes.shape({
            admin: PropTypes.bool,
            developer: PropTypes.bool,
            designer: PropTypes.bool,
          }),
        })
      ),
    })
  ).isRequired,
};

export default PBNavigationBar;

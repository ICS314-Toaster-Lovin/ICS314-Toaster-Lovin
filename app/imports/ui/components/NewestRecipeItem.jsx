import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function dateToTime(date) {
  const cDay = date.getDate();
  const cMonth = date.getMonth() + 1;
  const cYear = date.getFullYear();
  const cHour = date.getHours();
  const cMin = date.getMinutes();
  const cSec = date.getSeconds();

  return `${cDay}/${cMonth}/${cYear} ${cHour}:${cMin}:${cSec}`;
}

const NewestRecipeItem = ({ recipe, deleteItem }) => (
  <tr>
    <td>{dateToTime(recipe.createdAt)}</td>
    <td>
      <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
    </td>
    <td>{recipe.owner}</td>
    <td>
      <Button variant="danger" onClick={() => deleteItem(recipe._id)}>X</Button>
    </td>
  </tr>
);

// Require a document to be passed to this component.
NewestRecipeItem.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default NewestRecipeItem;

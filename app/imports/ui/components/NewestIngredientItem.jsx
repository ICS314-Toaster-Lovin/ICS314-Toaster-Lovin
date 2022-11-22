import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function dateToTime(date) {
  const cDay = date.getDate();
  const cMonth = date.getMonth() + 1;
  const cYear = date.getFullYear();
  const cHour = date.getHours();
  const cMin = date.getMinutes();
  const cSec = date.getSeconds();

  return `${cDay}/${cMonth}/${cYear} ${cHour}:${cMin}:${cSec}`;
}

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const NewestIngredientItem = ({ ingredient, deleteItem }) => (
  <tr>
    <td>{dateToTime(ingredient.createdAt)}</td>
    <td>{ingredient.name}</td>
    <td>{ingredient.vendor}</td>
    <td>{ingredient.owner}</td>
    <td>
      <Button variant="danger" onClick={() => deleteItem(ingredient._id)}>X</Button>
    </td>
  </tr>
);

// Require a document to be passed to this component.
NewestIngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    vendor: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default NewestIngredientItem;

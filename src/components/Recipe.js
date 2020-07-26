import React, { useState } from "react";
import {Modal, Button, Table} from 'react-bootstrap'
import { v4 as uuidv4 } from "uuid";

function Recipe({ recipe }) {
  const { label, image, url, ingredients } = recipe.recipe;
  const [lgShow, setLgShow] = useState(false);

  const listItems = ingredients.map((ingredient) => 
          <tr key={uuidv4()}>
            <td>{ingredient.text}</td>
            <td>{ingredient.weight.toFixed(2)}</td>
         </tr>
  );

    return (
      <div className="recipe">
        <h2>{label}</h2>
        <img src={image} alt={label} />
        <a href={url} target="_blank" rel="noopener noreferrer">
          URL
        </a>
        <Button onClick={() => setLgShow(!lgShow)}>Ingredients</Button>
              <Modal
                  size="lg"
                  show={lgShow}
                  onHide={() => setLgShow(false)}
                  aria-labelledby="example-modal-sizes-title-lg"
              >
              <Modal.Header closeButton>
              <h2>{label}</h2>
              </Modal.Header>
              <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Content</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
                </Table>
              </Modal.Body>
              </Modal>
        </div>
    )
}

export default Recipe;
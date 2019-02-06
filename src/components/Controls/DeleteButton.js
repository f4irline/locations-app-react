import React from 'react';

const DeleteButton = (props) => {

  function handleDelete() {
    props.deleteLocation(props.id);
  }

  return (
    <button onClick={() => handleDelete()}>Delete</button>
  )
}

export default DeleteButton;
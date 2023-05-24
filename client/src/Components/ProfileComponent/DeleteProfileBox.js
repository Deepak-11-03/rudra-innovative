import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteProfileBox() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const deleteProfile = async(e) => {
    e.preventDefault();
    let api = await fetch("http://localhost:3001/delete-profile", {
      method: "DELETE",
      mode: "cors",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    let result = await api.json();
    if (result.status === true) {
      localStorage.clear();
      navigate("/");
    } else {
      alert(result.msg);
    }
  };
  return (
    <div>
      {!popup ? (
        <div className="m-auto w-56 text-center ">
          <h1>Want to delete your profile</h1>
          <h2>Click Below</h2>
          <button onClick={() => setPopup(true)}>Delete</button>
        </div>
      ) : (
        <div className="m-auto w-56 text-center ">
          <h1>Are you sure ?</h1>
          <button onClick={deleteProfile}>Yes</button>
          <button onClick={() => setPopup(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default DeleteProfileBox;

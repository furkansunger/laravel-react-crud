import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

const UserForm = () => {
  let { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const handleUserSubmit = (e) => {
    e.preventDefault();
    
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          navigate('/users');
          console.log("Girdi-1")
        }).catch((error) => {
          const response = error.response;
          
          console.log("Girdi-2")
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
    } else {
      axiosClient.post('/users', user).then(() => {
        navigate('/users');
      }).catch((error) => {
        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
    }
  }

  return (
    <>
      {user.id && (
        <h1>Update User: {user.name}</h1>
      )}

      {!user.id && (
        <h1>New User</h1>
      )}

      <div className="card animated fadeInDown">
        {
          loading && (
            <div className="text-center">Loading...</div>
          )
        }
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        {
          !loading && (
            <form onSubmit={handleUserSubmit}>
              <input value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} type="text" placeholder="Name" />
              <input value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} type="email" placeholder="Email" />
              <input onChange={e => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" />
              <input onChange={e => setUser({ ...user, password_confirmation: e.target.value })} type="password" placeholder="Password Confirmation" />
              <button className="btn">Save</button>
            </form>
          )
        }
      </div>
    </>
  );
};

export default UserForm;

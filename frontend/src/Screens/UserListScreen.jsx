import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userListAction } from "../actions/userAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import "../views/userListScreen.css";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: useSelector(
        (state) => state.userLogin.userInfo && state.userLogin.userInfo.token
      ),
    },
  };
  const deleteUser = async (id) => {
    await axios.delete(`api/users/${id}`, config);
    console.log("user deleted");
    dispatch(userListAction());
  };

  const { loading, error, users } = useSelector((state) => state.userList);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userListAction());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
        <div className="userlist">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "5vh",
            }}
          >
            <h1>User List</h1>
            <div className="productScreen__back" style={{ marginRight: "4vw" }}>
              <Link to="/changeproducts" className="productScreen__back__link">
                Add and Remove Product
              </Link>
            </div>
          </div>

          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created on</th>
              <th>Admin</th>
              <th>Order History</th>
              <th>Delete User</th>
            </tr>

            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>

                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>{user.isAdmin ? "True" : "False"}</td>
                    <td>
                      <Link to={`/order/${user._id}`}>Orders</Link>
                    </td>
                    <td>
                      {!user.isAdmin && (
                        <button
                          style={{
                            border: "none",
                            outline: "none",
                            background: "white",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteUser(user._id)}
                        >
                          <i
                            className="fas fa-trash"
                            style={{
                              fontSize: "1.5rem",
                              color: "#ec4332",
                            }}
                          ></i>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      )}
    </>
  );
};

export default UserListScreen;

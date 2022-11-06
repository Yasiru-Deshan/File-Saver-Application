import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {

    const auth = useContext(AuthContext);
    const [message, setMessage] = useState("");

       const saveHandler = async (e) => {
         let update;

         e.preventDefault();
         const newMessage = {
           message: message,
           userId: auth.userId
         };

          try {
            const config = {
              headers: {
                "x-auth-token": `${auth.token}`,
                "Content-Type": "application/json",
              },
            };

            update = await axios.put(
              `${process.env.REACT_APP_BASE_URL}/api/auth/save`,
              newMessage,
              config
            );

            if (update) {
              window.alert("Message has been saved");
            }
          } catch (err) {
            console.log(err);
          }
       };

  return (
    <div
      style={{
        background: "#7F00FF" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(to left, #7F00FF,#E100FF)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(to left,#7F00FF, #E100FF)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
    >
      .
      <center>
        <Card
          className="text-center"
          style={{
            width: "28rem",
            marginTop: "5rem",
            marginBottom: "5rem",
            boxShadow: "5px 8px 35px ",
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          <Card.Body>
            <h4>Message</h4>

            <div className="mb-3">
              <input
                type="text"
                name="text"
                className="form-control mb-6"
                id="message"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Enter Message Here"
              />
              <div className="mt-3">
                <Button onClick={saveHandler}>Save</Button>
              </div>
            </div>

            {auth.role === "Worker" ? null : (
              <div className="mb-0">
                <h4>Upload Files Here</h4>
                <div>
                  <input
                    class="form-control form-control-lg"
                    id="formFileLg"
                    type="file"
                  />
                </div>
                <div className="mt-3">
                  <Link to="/">
                    <Button>Upload</Button>
                  </Link>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </center>
      .
    </div>
  );
};

export default Home;

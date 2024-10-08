import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBInput,
  MDBTypography,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";
import "./signIn.components.css";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer.components";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = async () => {
    try {
      let endpoint = "";
      if (role === "tourist") {
        endpoint = "http://localhost:8080/tourist";
      } else if (role === "guide") {
        endpoint = "http://localhost:8080/guide";
      }

      if (!endpoint) {
        console.error("Please select a role.");
        return;
      }

      const res = await axios.get(endpoint, {
        params: {
          email: email,
          password: password,
        },
      });

      if (res.status === 200) {
        const userData = res.data[0];
        if (userData.password === password && userData.role === role) {
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("role", role);
          navigate(`/signInDashboard/${role}/${email}`);
        } else {
          console.error("Enter correct credentials");
        }
      } else {
        console.error("Enter valid username");
      }
    } catch (err) {
      console.error("Login error: " + err.message);
    }
  };

  return (
    <>
      <form className="pb-5">
        <MDBContainer className="p-5 mt-5 signIn__form">
          <MDBRow className="mb-2">
            <MDBCol>
              <MDBTypography>Are you Tourist or Guide?</MDBTypography>
            </MDBCol>
            <MDBCol className="">
              <select
                className="w-100 h-75 rounded border-gray border border-secondary"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select</option>
                <option value="tourist">Tourist</option>
                <option value="guide">Guide</option>
              </select>
            </MDBCol>
          </MDBRow>
          <MDBInput
            className="mb-4"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
          />
          <MDBInput
            className="mb-4"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />

          <MDBRow className="mb-4">
            <MDBCol className="d-flex justify-content-center">
              <MDBCheckbox
                id="form2Example3"
                label="Remember me"
                flexCheckDefault
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-4">
            <MDBCol className="d-flex justify-content-center signIn__forgotText">
              <a href="#!">Forgot password?</a>
            </MDBCol>
          </MDBRow>

          <MDBBtn
            type="button"
            className="mb-4 signIn__button"
            block
            onClick={userLogin}
          >
            Sign in
          </MDBBtn>

          <div className="text-center signIn__forgotText">
            <p>
              Not a member?{" "}
              <a
                href="#!"
                onClick={() => {
                  navigate("/signUp");
                }}
              >
                Register
              </a>
            </p>
            <p>or sign In with:</p>

            <MDBBtn floating color="secondary" className="mx-1 signIn__icon">
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>

            <MDBBtn floating color="secondary" className="mx-1 signIn__icon">
              <MDBIcon fab icon="google" />
            </MDBBtn>

            <MDBBtn floating color="secondary" className="mx-1 signIn__icon">
              <MDBIcon fab icon="twitter" />
            </MDBBtn>

            <MDBBtn floating color="secondary" className="mx-1 signIn__icon">
              <MDBIcon fab icon="github" />
            </MDBBtn>
          </div>
        </MDBContainer>
      </form>
      <Footer />
      <ToastContainer />
    </>
  );
}

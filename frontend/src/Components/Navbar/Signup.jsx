import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signin_failure,
  signin_request,
  signin_success,
  signup_failure,
  signup_request,
  signup_success,
} from "../../Redux/Auth/action";
import { useNavigate } from "react-router-dom";

function Signup({ buttonName }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signin, setSignin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [show, setShow] = React.useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [SisError, SsetIsError] = useState(false);
  const [SisSuccess, SsetIsSuccess] = useState(false);
  const handleClick = () => setShow(!show);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.AuthReducer);
  const navigate = useNavigate();
  const toast = useToast();
  const handelSignin = async () => {
    const payload = { email, password };
    dispatch(signin_request());
    return await axios
      .post("https://jolly-rose-shoe.cyclic.app/user/login", payload)
      .then((res) => {
        dispatch(signin_success(res.data));
        console.log(res.data);
        navigate("/");
        SsetIsError(false);
        SsetIsSuccess(true);
        toast({
          title: "Login in Successfull",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        dispatch(signin_failure());
        SsetIsError(true);
        SsetIsSuccess(false);
      });
  };
  const handelSignup = async () => {
    const payload = { email, password, name };
    dispatch(signup_request());
    return await axios
      .post("https://jolly-rose-shoe.cyclic.app/user/signup", payload)
      .then((res) => {
        dispatch(signup_success());
        setIsError(false);
        setIsSuccess(true);
        setTimeout(() => {
          setSignin(true);
          setSignup(false);
        }, 2000);
      })
      .catch((err) => {
        dispatch(signup_failure());
        setIsError(true);
        setIsSuccess(false);
      });
  };
  return (
    <>
      <p onClick={onOpen}>
        {buttonName ? (
          <Button
            background="black"
            color="white"
            _hover={{ background: "rgb(84, 84, 84)" }}
          >
            LOGIN
          </Button>
        ) : (
          <BiUser size={"1.5em"} />
        )}
      </p>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius={"2px"}>
          <ModalHeader>Come on in</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setIsError(false);
              SsetIsError(false);
            }}
          />

          <ModalBody pb={6} marginBottom="-30px">
            <div style={{ display: "flex", gap: "30px" }}>
              <button
                onClick={() => {
                  setSignin(true);
                  setSignup(false);
                  setEmail("");
                  setPassword("");
                }}
                style={{ borderBottom: signin ? "2px solid black" : "none" }}
              >
                SIGN IN{" "}
              </button>
              <button
                onClick={() => {
                  setSignin(false);
                  setSignup(true);
                  setEmail("");
                  setPassword("");
                }}
                style={{ borderBottom: signup ? "2px solid black" : "none" }}
              >
                I'M NEW HERE{" "}
              </button>
            </div>
          </ModalBody>

          {signin && (
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  focusBorderColor="black"
                  ref={initialRef}
                  placeholder="Enter Email"
                  borderColor={"black.500"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    focusBorderColor="black"
                    borderColor={"black.500"}
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <h1 style={{ marginTop: "10px" }}>
                <input
                  style={{ marginRight: "10px" }}
                  type="checkBox"
                  width={"5px"}
                />
                Keep me signed in.
              </h1>
              {SisError && (
                <h1 style={{ color: "red", marginTop: "10px" }}>
                  Something went wrong
                </h1>
              )}
              {SisSuccess && (
                <h1 style={{ color: "green", marginTop: "10px" }}>
                  Login successfull
                </h1>
              )}
            </ModalBody>
          )}
          {signin && (
            <ModalFooter>
              <Button
                bg="black"
                color="white"
                _hover={{ bg: "#222f2f" }}
                mr={3}
                width="100%"
                onClick={handelSignin}
                isLoading={isLoading}
                disabled={!email || !password}
              >
                Sign in
              </Button>
            </ModalFooter>
          )}

          {signup && (
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  borderColor={"black.500"}
                  ref={initialRef}
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  focusBorderColor="black"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  borderColor={"black.500"}
                  ref={initialRef}
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="black"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    borderColor={"black.500"}
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    focusBorderColor="black"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <h1 style={{ marginTop: "10px", fontSize: "14px" }}>
                By registering, you agree with our <u>Terms & Conditions </u>{" "}
                and <u>Privacy and Cookie Policy</u>.
              </h1>
              <h1
                style={{ marginTop: "10px", fontSize: "14px", display: "flex" }}
              >
                <div>
                  <input
                    style={{ marginRight: "10px" }}
                    type="checkBox"
                    width={"5px"}
                  />
                </div>
                <div>
                  Sign up for promotions, tailored new arrivals, stock updates
                  and more. Unsubscribe at the bottom of our emails.{" "}
                  <u>Find out more</u>
                </div>
              </h1>
              {isError && (
                <h1 style={{ color: "red", marginTop: "10px" }}>
                  Email already register or something went wrong
                </h1>
              )}
              {isSuccess && (
                <h1 style={{ color: "green", marginTop: "10px" }}>
                  Sign up successfull please go to sign in
                </h1>
              )}
            </ModalBody>
          )}
          {signup && (
            <ModalFooter>
              <Button
                bg="black"
                color="white"
                _hover={{ bg: "#222f2f" }}
                mr={3}
                width="100%"
                onClick={handelSignup}
                isLoading={isLoading}
                disabled={!name || !email || !password}
              >
                Sign up
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export { Signup };

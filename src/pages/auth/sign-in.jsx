import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import AuthService from "@/services/auth-service";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "@/context/index";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/Utility/utility";

export function SignIn() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { userData } = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    // check rememeber me?
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      inputs.email.trim().length === 0 ||
      !inputs.email.trim().match(mailFormat)
    ) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (inputs.password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    const newUser = { email: inputs.email, password: inputs.password };

    try {
      const response = await AuthService.login(newUser);
      if (response.status == "OK") {
        authContext.login(response.data.access_token);
        toast("Login Successfully", "success");
      } else {
        toast("Invalid Creditials", "error");
      }
    } catch (res) {
      if (res.hasOwnProperty("message")) {
        toast("Invalid Creditials", "error");
      }
    }

    return () => {
      setInputs({
        email: "",
        password: "",
      });

      setErrors({
        emailError: false,
        passwordError: false,
      });
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard/home");
    }
  }, []);

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              size="lg"
              value={inputs.email}
              onChange={changeHandler}
              error={errors.emailError}
              name="email"
            />

            <Input
              type="password"
              label="Password"
              size="lg"
              value={inputs.password}
              onChange={changeHandler}
              error={errors.passwordError}
              name="password"
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={submitHandler}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;

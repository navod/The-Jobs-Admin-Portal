import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "@/components/Utility/utility";
import { ClipLoader } from "react-spinners";
import authService from "@/services/auth-service";

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [nic, setNic] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [reTypePassword, setRetypePassword] = useState("");

  const [isChecked, setIsChecked] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userSubmit = () => {
    if (firstName.length == 0) {
      toast("First name cannot be empty", "error");
      return;
    }

    if (lastName.length == 0) {
      toast("Last name cannot be empty", "error");
      return;
    }

    if (email.length == 0) {
      toast("Email cannot be empty", "error");
      return;
    }
    if (nic.length == 0) {
      toast("nic cannot be empty", "error");
      return;
    }

    if (mobile.length == 0) {
      toast("Phone number cannot be empty", "error");
      return;
    }

    if (password.length == 0) {
      toast("password cannot be empty", "error");
      return;
    }

    if (reTypePassword.length == 0) {
      toast("Re-type password cannot be empty", "error");
      return;
    }

    if (role.length == 0) {
      toast("Role cannot be empty", "error");
      return;
    }

    if (password !== reTypePassword) {
      toast("password does not match", "error");
      return;
    }

    if (isChecked == false) {
      toast("Please select privacy policy", "error");
      return;
    }

    const obj = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      nic: nic,
      role: role,
    };

    setLoading(true);
    authService
      .regiser(obj)
      .then((res) => {
        toast("User register succssfully..!", "success");
        setLoading(false);
        navigate("/auth/sign-in");
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1564730072969-84a1d8087f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[35rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                label="First Name"
                size="lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                label="Last Name"
                size="lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <Input
              type="email"
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-4">
              <Input
                type="password"
                label="Password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                value={reTypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                label="Re type Password"
                size="lg"
              />
            </div>
            <div className="flex gap-4">
              <Input
                type="tel"
                label="Phone number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                size="lg"
              />
              <Input
                label="NIC"
                size="lg"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
            </div>

            <Select
              label="Select Role"
              size="lg"
              value={role}
              onChange={(e) => setRole(e)}
            >
              <Option value="MANAGER">Manger</Option>
              <Option value="ADMIN">Admin</Option>
            </Select>

            <div className="-ml-2.5">
              <Checkbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                label="I agree the Terms and Conditions"
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            {loading ? (
              <div className="flex items-center justify-center">
                <ClipLoader size={40} color="green" />
              </div>
            ) : (
              <>
                <Button variant="gradient" fullWidth onClick={userSubmit}>
                  Sign Up
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Already have an account?
                  <Link to="/auth/sign-in">
                    <Typography
                      as="span"
                      variant="small"
                      color="blue"
                      className="ml-1 font-bold"
                    >
                      Sign in
                    </Typography>
                  </Link>
                </Typography>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;

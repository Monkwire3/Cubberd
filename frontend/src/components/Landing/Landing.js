import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Landing = () => {
  const currentUser = useSelector((state) => state.session.user);

  if (currentUser) {
    return <Redirect to="/main"></Redirect>;
  } else {
    return <Redirect to="/about"></Redirect>;
  }
};

export default Landing;

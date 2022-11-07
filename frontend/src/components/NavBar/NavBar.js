import "./NavBar.css";
import { Link, useHistory } from "react-router-dom";
import { useTour } from "@reactour/tour";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import panOne from "../../assets/pan.png";
import panTwo from "../../assets/pan2.png";
import ladle from "../../assets/ladle.png";
import spatula from "../../assets/spatula.PNG";
import hook from "../../assets/hook.png";
import { useContext } from "react";
import { PotContext } from "../../context/PotContext";
import { BsGithub } from "react-icons/bs";
import { CustomToolTipTop, CustomToolTipBottom } from "../ToolTip/ToolTip";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { setIsOpen } = useTour();
  const { animateRack } = useContext(PotContext);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <div className="navbar">
        <div className="info-rack-bar">
          <div className="rack-left-circle"></div>
          <div className="rack-bar"></div>
          <div className="rack-right-circle"></div>
          <div
            className={
              animateRack ? "hook pan-one-animate" : "hook pan-one-return"
            }
            id="pan-one-hook"
          >
            <img src={hook} />
            <div id="pan-one">
              <img src={panOne} />
              <CustomToolTipBottom
                title="See Adina's Github"
                arrow
                placement="bottom"
              >
                <a
                  href="https://github.com/arcoop"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </CustomToolTipBottom>
            </div>
          </div>
          <div
            className={
              animateRack ? "hook pan-two-animate" : "hook pan-two-return"
            }
            id="pan-two-hook"
          >
            <img src={hook} />
            <div id="pan-two">
              <img src={panTwo} />
              <CustomToolTipBottom
                title="See Fred's Github"
                arrow
                placement="bottom"
              >
                <a
                  href="https://github.com/fredchien3"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </CustomToolTipBottom>
            </div>
          </div>
          <div
            className={
              animateRack ? "hook ladle-hook-animate" : "hook ladle-hook-return"
            }
            id="ladle-hook"
          >
            <img src={hook} />
            <div id="ladle">
              <img src={ladle} />
              <CustomToolTipTop
                title="See Tommy's Github"
                arrow
                placement="top"
              >
                <a
                  href="https://github.com/sungyotkim"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </CustomToolTipTop>
            </div>
          </div>
          <div
            className={
              animateRack
                ? "hook spatula-hook-animate"
                : "hook spatula-hook-return"
            }
            id="spatula-hook"
          >
            <img src={hook} />
            <div id="spatula">
              <img src={spatula} />
              <CustomToolTipTop
                title="See Clide's Github"
                arrow
                placement="top"
              >
                <a
                  href="https://github.com/Monkwire3"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </CustomToolTipTop>
            </div>
          </div>
        </div>
        <div className="nav-right">
          {sessionUser && (
            <span className="welcome-user">Hello, {sessionUser.username}!</span>
          )}
          <div className="nav-links-div">
            <div className="nav-bar-link">
              <Link className="nav-bar-link" to="/about">
                About
              </Link>
            </div>
            <div className="nav-bar-link">
              <Link id="my-recipes-link" className="nav-bar-link" to="/profile">
                My Recipes
              </Link>
            </div>
            <div className="nav-bar-link" onClick={() => setIsOpen(true)}>
              Tutorial
            </div>
            <div className="nav-bar-link" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

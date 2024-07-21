import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

const Nav = styled(motion.nav)`
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const MenuList = styled.ul`
  height: 7vh;
  margin-top: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px red solid; */
`;

const Menu = styled.li`
  margin: 0px 15px;
  position: relative;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  // bottom: -12px;
  top: -10px;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function Header() {
  const navAnimation = useAnimation();
  const homeMatch = useRouteMatch("/");
  const comSnMatch = useRouteMatch("/coming-soon");
  const nowPlyMatch = useRouteMatch("/now-playing");

  const { scrollY } = useViewportScroll();
  useEffect(() => {
    // scrollY.onChange(() => console.log(scrollY.get()));
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navVariants]);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <MenuList>
        <Menu>
          <Link to="/">
            Popular {homeMatch?.isExact && <Circle layoutId="circle" />}{" "}
          </Link>
        </Menu>

        <Menu>
          <Link to="/coming-soon">
            Coming Soon {comSnMatch && <Circle layoutId="circle" />}{" "}
          </Link>
        </Menu>

        <Menu>
          <Link to="/now-playing">
            Now Playing {nowPlyMatch && <Circle layoutId="circle" />}{" "}
          </Link>
        </Menu>
      </MenuList>
    </Nav>
  );
}

export default Header;

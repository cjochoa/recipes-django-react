// @flow
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  justify-content: ${p => {
    if (p.center === "all") return "center";
    if (p.end === "all") return "flex-end";
    if (p.between === "all") return "space-between";
    return "flex-start";
  }};
  align-items: ${p => {
    if (p.middle === "all") return "center";
    return "flex-start";
  }};
`;

export default Layout;

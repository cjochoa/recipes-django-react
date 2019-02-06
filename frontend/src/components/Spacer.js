// @flow
import styled from "styled-components";

const Spacer = styled.div`
  padding-top: calc(8px * ${p => p.top || 0});
  padding-right: calc(8px * ${p => p.right || 0});
  padding-bottom: calc(8px * ${p => p.bottom || 0});
  padding-left: calc(8px * ${p => p.left || 0});
`;

export default Spacer;

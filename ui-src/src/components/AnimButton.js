import styled from 'styled-components/macro'

export default styled.section`
  background-color: #eaeaea;

  width: 100%;
  position: relative;
  display: inline-block;
  // float: left;
  padding: 40px;
  transition: all 0.5s;

  cursor: pointer;
  user-select: none;

  &:after {
    position: absolute;
    z-index: 9;
    content: '';
    transition: all 0.25s;
  }

  &:hover:after {
    width: 100%;
    height: 100%;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 99;
    font-size: 18px;
    color: #444;
    text-align: center;
    text-transform: uppercase;
    transform: translate(-50%, -50%);
  }

  &:after {
    left: 0;
    background-color: #fff;
  }

  &:after {
    top: 0;
    width: 0;
    height: 100%;
  }
`

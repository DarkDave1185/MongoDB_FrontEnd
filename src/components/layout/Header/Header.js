import React from "react";
import "./styleHeader.css";
import { Link } from "react-router-dom";
import AuthOption from "../../authentication/AuthOption/AuthOption";

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">Something</h1>
      </Link>
      <AuthOption />
    </header>
  );
}

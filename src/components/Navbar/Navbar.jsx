import React, { useContext} from "react";
import "./Navbar.css";
import Links from "./Links";
import { NavLink} from "react-router-dom";
import Usercontext from "../../contexts/UserContexts";
import Cartcontext from "../../contexts/CartContexts";
// import { getSuggetionsAPI } from "../../services/productServices";

const Navbar = () => {
  // const [search, setSearch] = useState("");
  // const [suggetions, setSuggetions] = useState([]);
  const user = useContext(Usercontext);
  const { cart } = useContext(Cartcontext);
  // const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (search !== "") {
  //     navigate(`/products?search=${search}`);
  //   }
  // };
  // useEffect(() => {
  //   if (search !== "") {
  //     getSuggetionsAPI(search)
  //       .then((res) => setSuggetions(res.data))
  //       .catch((err) => console.log(err));
  //   } else {
  //     setSuggetions([]);
  //   }
  // }, [search]);
  // console.log(suggetions)
  return (
    <nav className="align_center navbar ">
      <div className="align_center">
        <h1 className="navbar_heading">
          <span className="span_1">me</span>
          <span className="span_2">ta</span>
          <span className="span_3">Ca</span>
          <span className="span_4">rt</span>
        </h1>
        {/* <form className=" align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            className="navbar_search"
            placeholder="Search Products"
            onChange={(e) => setSearch(e.target.event)}
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form> */}
      </div>
      <div className="align_center navbar_links">
        <Links title="Home" link="/" />
        <Links title="Products" link="/products" />
        {!user && (
          <>
            <Links title="Login" link="/login" />
            <Links title="Signup" link="/signup" />
          </>
        )}
        {user && (
          <>
            {" "}
            <Links title="My Orders" link="/myorders" />
            <Links title="Logout" link="/logout" />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

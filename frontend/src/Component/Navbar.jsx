import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    navigate("/signin");
  };

  return (
    <div style={styles.navbar}>
      <h3 style={styles.logo}>MyStore</h3>

      <div style={styles.profileBox}>
        <span style={styles.profileName}>
          👤 {user?.email || "Profile"}
        </span>

        <div style={styles.dropdown}>
          {/* <button
            style={styles.btn}
            onClick={() => alert("Profile page baad me banega 🙂")}
          >
            Profile
          </button> */}

          <button
            style={{ ...styles.btn, color: "red",margin:0,padding:"5px" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#222",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  profileBox: {
    position: "relative",
    cursor: "pointer",
    right: "70px",
  },
  profileName: {
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    right: "-80px",
    top: "-3px",
    background: "#fff",
    color: "#000",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  btn: {
    position:"relative",
    border: "none",
    background: "none",
    cursor: "pointer",
    textAlign: "left",
  },
};

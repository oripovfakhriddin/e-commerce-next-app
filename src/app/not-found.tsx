import NavLink from "@/components/shares/navlink";

const NotFoundPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <h1>Not Found Page</h1>
      <NavLink href="/">
        <h3 style={{ color: "orange", marginTop: "40px" }}>
          Bosh sahifaga qaytish
        </h3>
      </NavLink>
    </div>
  );
};

export default NotFoundPage;

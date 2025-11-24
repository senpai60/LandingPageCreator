export const defaultStyle = (elementType) => {
  const base = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
  };

  const presets = {
    div: {
      minHeight: "50px",
      backgroundColor: "transparent", // Clean look, no background by default
      padding: "10px",
      // Border hata diya taaki nested divs gande na dikhein
      gap: "10px", 
    },

    section: {
      minHeight: "200px",
      width: "100%",
      padding: "40px",
      backgroundColor: "#ffffff",
      gap: "20px",
      // Sirf Section ko alag dikhane ke liye halka border
      borderBottom: "1px solid #f0f0f0", 
    },

    p: {
      fontSize: "16px",
      color: "#4b5563",
      lineHeight: "1.6",
      marginBottom: "0px",
      width: "auto",
    },

    h1: {
      fontSize: "36px",
      fontWeight: "800",
      color: "#111827",
      lineHeight: "1.2",
      marginBottom: "10px",
      width: "auto",
    },

    h2: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "8px",
      width: "auto",
    },

    button: {
      backgroundColor: "#2563eb",
      color: "#fff",
      padding: "10px 24px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      border: "none",
      width: "fit-content",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },

    img: {
      width: "100%",
      maxWidth: "100%", 
      height: "auto",
      objectFit: "cover",
      borderRadius: "4px",
      display: "block",
    },
  };

  return { ...base, ...(presets[elementType] || {}) };
};